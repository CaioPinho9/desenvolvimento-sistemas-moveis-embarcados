#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <Arduino_JSON.h>
#include <ArduinoJson.h>

const int R = D8;
const int G = D7;
const int B = D6;
const int button = D5;
const int lightSensor = A0;

int rgbColorsList[8][3];
int listSize = sizeof(rgbColorsList) / sizeof(rgbColorsList[0]);

int current = 0;
unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 100;

bool lastButtonState = LOW;
bool lastActive = false;
bool active;

unsigned long lastSensorUpdate = 0;
unsigned long sensorUpdateInterval = 10000;
int lastPrintedLightValue = -1;
int lightSensitivity = 100;

unsigned long previousMillis = 0;
const long interval = 10000;

// Define LED and sensor pins
void definePins() {
  pinMode(R, OUTPUT);
  pinMode(G, OUTPUT);
  pinMode(B, OUTPUT);
  pinMode(button, INPUT_PULLUP);
  pinMode(lightSensor, INPUT);
}

// Define WiFi connection details
const char* ssid = "Batata";
const char* password = "1234567890";
WiFiClient client;

String host = "http://192.168.161.103:8080";

void setup() {
  pinMode(R, OUTPUT);
  pinMode(G, OUTPUT);
  pinMode(B, OUTPUT);
  pinMode(button, INPUT_PULLUP);
  pinMode(lightSensor, INPUT);

  Serial.begin(115200);

  connectToWifi();

  fetch_config();

  updateColor();

  Serial.println("Setup complete. Starting with the first color...");
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    connectToWifi();
  }

  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    fetch_config();
  }

  handleButton();

  if (!handleLightSensor())
    return;
}

void connectToWifi() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConnected");
  Serial.println(WiFi.localIP());
}

bool handleLightSensor() {
  int lightSensorValue = analogRead(lightSensor);
  active = lightSensorValue > lightSensitivity;

  if (active != lastActive) {
    if (!active) {
      turnOff();
    } else {
      updateColor();
      Serial.print(listToString(rgbColorsList[current], 3));
    }

    Serial.print("Turned ");
    Serial.println(active ? "on" : "off");
    log_event("light", String(lightSensorValue));
  }
  lastActive = active;

  unsigned long currentMillis = millis();
  if (currentMillis - lastSensorUpdate > sensorUpdateInterval) {
    if (lastPrintedLightValue != lightSensorValue) {
      Serial.print("Light sensor value: ");
      Serial.println(lightSensorValue);

      lastPrintedLightValue = lightSensorValue;
      lastSensorUpdate = currentMillis;
    }
  }

  return active;
}

void handleButton() {
  bool currentButtonState = digitalRead(button);

  if (currentButtonState != lastButtonState && currentButtonState == HIGH) {
    if ((millis() - lastDebounceTime) > debounceDelay) {
      int previousColorIndex = current;
      current = (current + 1) % listSize;
      if (current != previousColorIndex) {
        Serial.print("Button pressed. Changing to color index: ");
        Serial.println(current);
        log_event("button", listToString(rgbColorsList[current], 3));

        if (active) {
          updateColor();
        }
      }
      lastDebounceTime = millis();
    }
  }

  lastButtonState = currentButtonState;
}

String listToString(int list[], int size) {
  String result = "[";
  for (int i = 0; i < size; i++) {
    result += String(list[i]);
    if (i < size - 1) {
      result += ",";
    }
  }
  result += "]";
  return result;
}

void turnOff() {
  digitalWrite(R, HIGH);
  digitalWrite(G, HIGH);
  digitalWrite(B, HIGH);
}

void updateColor() {
  int* rgbVoltage = rgbColorsList[current];
  digitalWrite(R, voltage(rgbVoltage[0]));
  digitalWrite(G, voltage(rgbVoltage[1]));
  digitalWrite(B, voltage(rgbVoltage[2]));

  Serial.print("R: ");
  Serial.print(voltage(rgbVoltage[0]) == LOW ? "On" : "Off");
  Serial.print(", G: ");
  Serial.print(voltage(rgbVoltage[1]) == LOW ? "On" : "Off");
  Serial.print(", B: ");
  Serial.println(voltage(rgbVoltage[2]) == LOW ? "On" : "Off");
}

int voltage(int color) {
  return color ? LOW : HIGH;
}

void send_http_request(const String& endpoint, const String& body, bool isGetRequest) {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    http.begin(client, host + endpoint);

    int httpCode;
    if (isGetRequest) {
      httpCode = http.GET();
    } else {
      http.addHeader("Content-Type", "application/json");
      httpCode = http.POST(body);
    }

    if (httpCode > 0) {
      if (httpCode == HTTP_CODE_OK) {
        String payload = http.getString();
        if (isGetRequest) {
          Serial.println("Request OK");
          Serial.println(payload);
          parse_json_and_set_colors(payload);
        } else {
          Serial.println("POST request OK");
        }
      } else {
        Serial.print("HTTP request failed, code: ");
        Serial.println(httpCode);
      }
    } else {
      Serial.print("HTTP request failed, error: ");
      Serial.println(http.errorToString(httpCode).c_str());
    }

    http.end();
  } else {
    Serial.println("Not connected to WiFi");
  }
}

void fetch_config() {
  send_http_request("/config", "", true);
}

void log_event(const String& input, const String& value) {
  StaticJsonDocument<200> doc;
  doc["input"] = input;
  doc["value"] = value;
  String requestBody;
  serializeJson(doc, requestBody);
  send_http_request("/log", requestBody, false);
}

void parse_json_and_set_colors(const String& body) {
  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, body);

  if (error) {
    Serial.print("deserializeJson() failed: ");
    Serial.println(error.f_str());
    return;
  }

  lightSensitivity = doc["light_sensitivity"];
  Serial.print("Light Sensitivity: ");
  Serial.println(lightSensitivity);

  JsonArray colorsArray = doc["colors"].as<JsonArray>();

  int i = 0;
  for (JsonVariant v : colorsArray) {
    if (v.is<JsonArray>()) {
      JsonArray colorArray = v.as<JsonArray>();
      for (int j = 0; j < colorArray.size(); j++) {
        rgbColorsList[i][j] = colorArray[j].as<int>();
        Serial.print("  Color value [");
        Serial.print(j);
        Serial.print("]: ");
        Serial.println(rgbColorsList[i][j]);
      }
      i++;
    }
  }
  listSize = i;

  if (current > listSize - 1) {
    current = listSize - 1;
  }
  if (active) {
    updateColor();
  }
}
