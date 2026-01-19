#include <TinyGPS++.h>
#include <Adafruit_Fingerprint.h>
#include <SoftwareSerial.h>

// GPS is on Hardware Serial: pins 0 (RX) and 1 (TX)
TinyGPSPlus gps;

// Fingerprint sensor on D2 (RX) and D3 (TX)
SoftwareSerial fingerSerial(2, 3);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&fingerSerial);

// For time intervals
unsigned long lastGPSUpdate = 0;
const unsigned long gpsInterval = 20000;  // 20 sec

void setup() {
  // Begin Hardware Serial for GPS
  Serial.begin(9600); // Hardware Serial for GPS on pins 0 and 1

  // Begin SoftwareSerial for Fingerprint
  fingerSerial.begin(57600);

  // Use Serial Monitor for debug — BUT:
  // You cannot use Serial Monitor on the USB at same time as GPS on pins 0/1.
  // So for debugging, unplug GPS TX from D0 while uploading and testing.

  // Basic debug
  delay(1000);
  Serial.println("Smart Bus Tracker with GPS + Fingerprint");

  if (finger.verifyPassword()) {
    Serial.println("Fingerprint sensor ready.");
  } else {
    Serial.println("Fingerprint sensor NOT found!");
    while (1);
  }

  finger.getTemplateCount();
  Serial.print("Sensor has ");
  Serial.print(finger.templateCount);
  Serial.println(" templates");

  Serial.println("Waiting for GPS fix...");
}

void loop() {
  // --- 1) Read GPS data ---
  while (Serial.available() > 0) {
    gps.encode(Serial.read());
  }

  // --- 2) Print GPS fix every 20 sec if valid ---
  if (millis() - lastGPSUpdate >= gpsInterval && gps.location.isValid()) {
    lastGPSUpdate = millis();

    Serial.println("=== GPS DATA ===");
    Serial.print("Latitude: ");
    Serial.println(gps.location.lat(), 6);
    Serial.print("Longitude: ");
    Serial.println(gps.location.lng(), 6);
    Serial.print("Satellites: ");
    Serial.println(gps.satellites.value());
    Serial.println("-----------------------------");
  }

  // --- 3) Check fingerprint ---
  int id = getFingerprintID();
  if (id > 0) {
    Serial.print("Student ID ");
    Serial.print(id);
    Serial.println(" verified!");
    delay(5000);  // debounce
  }

  delay(50); // avoid busy loop
}

int getFingerprintID() {
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK) return -1;

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK) return -1;

  p = finger.fingerSearch();
  if (p == FINGERPRINT_OK) {
    return finger.fingerID;
  } else {
    return -1;
  }
}
