import serial
import requests

ser = serial.Serial('COM4', 9600)  # Change COM port as needed
server = "http://localhost:3000"

latitude = None
longitude = None

while True:
    try:
        line = ser.readline().decode().strip()
        print("Arduino:", line)

        # Check for GPS data
        if "Latitude:" in line:
            latitude = float(line.split(":")[1].strip())

        elif "Longitude:" in line:
            longitude = float(line.split(":")[1].strip())

        if latitude is not None and longitude is not None:
            print(f"📡 Sending lat={latitude}, lon={longitude}")
            requests.post(f"{server}/updateLocation", json={
                "latitude": latitude,
                "longitude": longitude
            })
            latitude = None
            longitude = None

        # Fingerprint log
        if "verified!" in line:
            id_str = line.split("ID")[1].split(" ")[1]
            print(f"🧠 Student ID {id_str} verified.")
            requests.post(f"{server}/boarded", json={"student_id": int(id_str)})

    except Exception as e:
        print("Error:", e)
