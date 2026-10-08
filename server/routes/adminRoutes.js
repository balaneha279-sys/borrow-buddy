const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const students = await pool.query(
      "SELECT COUNT(*) FROM students"
    );

    const products = await pool.query(
      "SELECT COUNT(*) FROM products"
    );

    const requests = await pool.query(
      "SELECT COUNT(*) FROM requests"
    );

    const pendingRequests = await pool.query(
      "SELECT COUNT(*) FROM requests WHERE status = 'PENDING'"
    );

    res.json({
      totalStudents: Number(students.rows[0].count),
      totalProducts: Number(products.rows[0].count),
      totalRequests: Number(requests.rows[0].count),
      pendingRequests: Number(pendingRequests.rows[0].count)
    });

  } catch (error) {
    console.error("Admin stats error:", error);

    res.status(500).json({
      message: "Failed to load admin statistics"
    });
  }
});

module.exports = router;

// GET ALL STUDENTS
router.get("/students", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, college, role, is_verified, blocked, created_at
       FROM students
       ORDER BY created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Get students error:", error);

    res.status(500).json({
      message: "Failed to load students"
    });
  }
});


// BLOCK / UNBLOCK STUDENT
router.patch("/students/:id/block", async (req, res) => {
  try {
    const { id } = req.params;
    const { blocked } = req.body;

    const result = await pool.query(
      `UPDATE students
       SET blocked = $1
       WHERE id = $2
       RETURNING id, name, email, blocked`,
      [blocked, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json({
      message: blocked
        ? "Student blocked successfully"
        : "Student unblocked successfully",
      student: result.rows[0]
    });

  } catch (error) {
    console.error("Block student error:", error);

    res.status(500).json({
      message: "Failed to update student"
    });
  }
});


// GET ALL PRODUCTS FOR ADMIN
router.get("/products", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        p.id,
        p.name,
        p.description,
        p.category,
        p.type,
        p.image_url,
        p.buy_price,
        p.rent_price,
        p.rent_duration,
        p.owner_id,
        s.name AS owner_name,
        s.email AS owner_email,
        p.created_at
       FROM products p
       JOIN students s ON p.owner_id = s.id
       ORDER BY p.created_at DESC`
    );

    res.json(result.rows);

  } catch (error) {
    console.error("Get admin products error:", error);

    res.status(500).json({
      message: "Failed to load products"
    });
  }
});