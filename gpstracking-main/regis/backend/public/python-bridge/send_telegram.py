import serial
import time
import requests

# Serial port settings (adjust COM to your actual port)
arduino = serial.Serial(port='COM4', baudrate=9600, timeout=1)
time.sleep(2)  # wait for Arduino to reset

# Telegram bot details
BOT_TOKEN = "8263699641:AAELHk-wJ5P_MempaFWdf1A04kYzwGNMzfc"
CHAT_ID = "-4587526524"  # group chat ID

def send_message(text):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = {"chat_id": CHAT_ID, "text": text}
    requests.post(url, data=payload)

print("Listening for fingerprint scans...")

while True:
    if arduino.in_waiting > 0:
        line = arduino.readline().decode().strip()
        print(f"Arduino says: {line}")

        if line == "Haitam":
            send_message("Haitam has boarded")
        elif line == "Haseeb":
            send_message("Haseeb has boarded")
        # Ignore "No match found"
