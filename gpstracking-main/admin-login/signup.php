<?php
$servername = "localhost";
$dbusername = "root";
$dbpassword = ""; // change if your MySQL root has a password
$dbname = "gps_admin";

// Connect to MySQL
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from form
$username = $_POST['username'];
$password = $_POST['password'];

// Hash the password for security
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert into database
$sql = "INSERT INTO users (username, password) VALUES ('$username', '$hashed_password')";

if ($conn->query($sql) === TRUE) {
    echo "<script>alert('Signup successful! You can now login.'); window.location='adminlogin.html';</script>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
