const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ===== Serve HTML, CSS, JS from public/ =====
app.use(express.static(path.join(__dirname, "public")));

// ===== MySQL connection =====
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // your MySQL username
    password: "haseeb!@", // your MySQL password
    database: "bus_tracking"
});

db.connect(err => {
    if (err) throw err;
    console.log("✅ MySQL Connected");
});

// ===== Signup Route =====
app.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, role || "user"],
            (err) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(400).json({ error: "Email already exists" });
                    }
                    return res.status(500).json({ error: err });
                }
                res.json({ message: "Signup successful" });
            }
        );
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// ===== Login Route =====
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(401).json({ error: "Invalid credentials" });

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: "Invalid credentials" });

        res.json({ message: "Login successful", role: user.role });
    });
});

// ===== Start server =====
app.listen(4000, () => console.log("🚀 Server running on http://localhost:4000"));
