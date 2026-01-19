# TraffoWagon

TraffoWagon is a real-time bus tracking and management system that allows users to locate buses, track routes, and explore nearby bus stops using a user-friendly interface.

---

## Features

### Real-Time Bus Tracking
- Track buses live on a map with accurate GPS updates.
- Provides estimated arrival times and live location data.

### Bus Stops Information
- Explore all nearby bus stops with details and schedules.

### User Authentication
- Login and signup pages for accessing personalized features.

### Interactive and Responsive UI
- Designed with Bootstrap for a seamless experience across devices.

---

## Requirements

### Software Requirements
- **Web Browser**: Modern browsers like Chrome, Firefox, Edge, or Safari.
- **Server**: Node.js runtime environment.
- **Database**: MySQL for storing location and user data.

### Technologies Used
- **Frontend**: HTML, CSS (Bootstrap), JavaScript.
- **Backend**: Node.js with Express.
- **Database**: MySQL for location data storage.
- **API**: Google Maps API for displaying bus locations.

---

## Installation Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/traffowagon.git
   cd traffowagon
2. **Install the dependencies**:
   ```bash
   npm install
3. **Set up the MySQL database**:
   - Create a database named `gps_data`.
   - Import the provided SQL schema to create the necessary tables.

4. **Configure the database connection**:
   - Open the `database.js` file.
   - Update it with your MySQL credentials:
     ```javascript
     const pool = mysql.createPool({
         host: 'your-database-host',
         user: 'your-database-username',
         password: 'your-database-password',
         database: 'gps_data',
     });
     ```
     Replace `your-database-host`, `your-database-username`, and `your-database-password` with your actual credentials.

5. **Start the server**:
   ```bash
   node server.js

6. **Access the system**:
   - Open main.html in your preferred web browser.

---

## Folder Structure

- **CSS/**
  - `bootstrap.min.css`
- **JS/**
  - `bootstrap.bundle.min.js`
- **IMG/**
  - `logo3.png`
  - `slide1.jpeg`
  - `slide2.jpg`
  - `CIT.jpeg`
  - `KMCH.jpeg`
  - `RaceCourse.jpeg`
- `busstops.html`
- `bustracking.html`
- `CIT.html`
- `gps.html`
- `login.html`
- `signup.html`
- `main.html`
- `server.js`
- `database.js`

---

## Pages Overview

### Home (`main.html`)
- Highlights the system's features, including real-time tracking and nearby bus stops.

### Bus Stops (`busstops.html`)
- Lists all nearby bus stops with interactive details.

### Bus Tracking (`bustracking.html`)
- Displays live bus locations on Google Maps.

### Bus Stop Details (`CIT.html`)
- Provides details of available buses, destinations, and arrival times.

### User Authentication (`login.html`, `signup.html`)
- Enables users to create an account or log in for personalized features.

### GPS Location (`gps.html`)
- Allows users to share their GPS location with the system.

---

## How to Run

1. **Start the Node.js server**:
   ```bash
   node server.js

2. **Open main.html in a web browser.**

3. **Explore the app**:
   - Use the navigation bar to locate buses, view nearby bus stops, or explore bus stop details.

---

## Future Enhancements

- Add user dashboards to save favorite routes or stops.
- Enable booking functionality with integrated payment gateways.
- Enhance security for user authentication.
- Provide push notifications for bus arrivals and updates.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Credits

- Developed by **Shah Humayun Bashir**.
- Thanks to **Bootstrap** and **Google Maps API** for enabling responsive design and real-time location tracking.







