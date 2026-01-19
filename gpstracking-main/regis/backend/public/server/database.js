const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'haseeb!@',
  database: 'gps_data',
});
function storeLocationData(locationData) {
    const { latitude, longitude, deviceId } = locationData;
    const timestamp = new Date();
    const query = `
        INSERT INTO location_data (latitude, longitude, timestamp)
        VALUES (?, ?, ?)
    `;
    pool.execute(query, [latitude, longitude, timestamp], (error, results) => {
        if (error) {
            console.error('Error storing location data:', error);
        } else {
            console.log('Location data stored successfully');
        }
    });
}
module.exports = {
    storeLocationData,
};
