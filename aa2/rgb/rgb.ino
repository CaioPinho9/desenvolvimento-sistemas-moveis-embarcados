
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <Arduino_JSON.h>
#include <ArduinoJson.h>  // Include the ArduinoJson library

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

unsigned long lastSensorUpdate = 0;
unsigned long sensorUpdateInterval = 10000;
int lastPrintedLightValue = -1;
int lightSensitivity = 100;


String apiUrl = "http://192.168.186.103:3000/api/colors";

void setup() {
  pinMode(R, OUTPUT);
  pinMode(G, OUTPUT);
  pinMode(B, OUTPUT);
  pinMode(button, INPUT_PULLUP);
  pinMode(lightSensor, INPUT);

  Serial.begin(115200);

  WiFi.begin("Batata", "1234567890");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConnected");
  Serial.println(WiFi.localIP());

  send_http_get();

  updateColor();

  Serial.println("Setup complete. Starting with the first color...");
}

void loop() {
  if (!handleLightSensor())
    return;

  handleButton();
}

bool handleLightSensor() {
  int lightSensorValue = analogRead(lightSensor);
  bool active = lightSensorValue > lightSensitivity;

  if (active != lastActive) {
    if (!active) {
      turnOff();
    } else {
      updateColor();
    }

    Serial.print("Turned ");
    Serial.println(active ? "on" : "off");
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
        updateColor();
      }
      lastDebounceTime = millis();
    }
  }

  lastButtonState = currentButtonState;
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

void send_http_get() {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    http.begin(client, apiUrl);

    int httpCode = http.GET();
    if (httpCode == HTTP_CODE_OK) {
      String payload = http.getString();
      Serial.println("Request OK");
      deserializeJsonAndSetColors(payload);
    } else {
      Serial.print("HTTP GET failed, code: ");
      Serial.println(httpCode);
    }

    http.end();
  } else {
    Serial.println("Not connected to WiFi");
  }
}

void deserializeJsonAndSetColors(const String& body) {
  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, body);

  if (error) {
    Serial.print("deserializeJson() failed: ");
    Serial.println(error.f_str());
    return;
  }

  JsonArray arr = doc.as<JsonArray>();

  int i = 0;
  for (JsonVariant v : arr) {
    rgbColorsList[i][0] = v[0];
    rgbColorsList[i][1] = v[1];
    rgbColorsList[i][2] = v[2];
    i++;
  }
  listSize = i;
}
