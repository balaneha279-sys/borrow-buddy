const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../config/db");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, college } = req.body;

    if (!name || !email || !password || !college) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await pool.query(
      "SELECT * FROM students WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO students (name, email, password, college)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, college, role, is_verified, blocked, created_at`,
      [name, email, hashedPassword, college]
    );

    res.status(201).json({
      message: "Student registered successfully",
      student: result.rows[0]
    });

  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;


//login 

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const result = await pool.query(
      "SELECT * FROM students WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const student = result.rows[0];

    if (student.blocked) {
      return res.status(403).json({
        message: "Your account has been blocked"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      student.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    res.status(200).json({
      message: "Login successful",
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        college: student.college,
        role: student.role
      }
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
});