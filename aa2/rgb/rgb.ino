const int R = D8;
const int G = D7;
const int B = D6;
const int button = D5;
const int lightSensor = A0;

int rgbColorsList[][3] = {
  { 1, 1, 1 },
  { 1, 0, 0 },
  { 0, 1, 0 },
  { 0, 0, 1 },
  { 0, 0, 0 }
};
int listSize = sizeof(rgbColorsList) / sizeof(rgbColorsList[0]);

int current = 0;
unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 100;

bool lastButtonState = LOW;
bool lastActive = false;

void setup() {
  pinMode(R, OUTPUT);
  pinMode(G, OUTPUT);
  pinMode(B, OUTPUT);
  pinMode(button, INPUT_PULLUP);
  pinMode(lightSensor, INPUT);

  Serial.begin(9600);
  Serial.println("Setup complete. Starting with the first color...");

  updateColor();
}

void loop() {
  int lightSensorValue = analogRead(lightSensor);
  bool active = lightSensorValue > 100;

  if (!active) {
    turnOff();
    Serial.println("Turn off");
    lastActive = active;
    return;
  } else if (!lastActive) {
    updateColor();
    Serial.println("Turn on");
    lastActive = active;
  }

  handleButton();
}

void handleButton() {
  bool currentButtonState = digitalRead(button);

  if (currentButtonState != lastButtonState && currentButtonState == HIGH) {
    if ((millis() - lastDebounceTime) > debounceDelay) {
      current = (current + 1) % listSize;
      Serial.print("Button released. Changing to color index: ");
      Serial.println(current);
      updateColor();
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

  Serial.println("Updated LED colors:");
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
