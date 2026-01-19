#include <Adafruit_Fingerprint.h>
#include <SoftwareSerial.h>

SoftwareSerial mySerial(2, 3); // RX, TX for fingerprint sensor
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

void setup() {
  Serial.begin(9600);     // For communication with Python
  finger.begin(57600);    // Fingerprint sensor baud rate

  if (finger.verifyPassword()) {
    Serial.println("Found fingerprint sensor!");
  } else {
    Serial.println("Did not find fingerprint sensor :(");
    while (1) { delay(1); }
  }
}

void loop() {
  getFingerprintID();
  delay(50);
}

int getFingerprintID() {
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK) return -1;

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK) return -1;

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK) {
    Serial.println("No match found");
    return -1;
  }

  // Match found
  int id = finger.fingerID;
  if (id == 1) {
    Serial.println("Haitam");
  } else if (id == 2) {
    Serial.println("Haseeb");
  } else {
    Serial.print("Unknown ID: ");
    Serial.println(id);
  }
  return finger.fingerID;
}
