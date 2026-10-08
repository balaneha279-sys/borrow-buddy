const express = require("express");
const pool = require("../config/db");

const router = express.Router();


// ==========================================
// ADD PRODUCT
// ==========================================
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      type,
      image_url,
      buy_price,
      rent_price,
      rent_duration,
      owner_id
    } = req.body;

    if (!name || !category || !type || !owner_id) {
      return res.status(400).json({
        message: "Name, category, type and owner_id are required"
      });
    }

    // Validate Buy
    if (
      (type === "BUY" || type === "BOTH") &&
      (buy_price === null ||
        buy_price === undefined ||
        buy_price === "")
    ) {
      return res.status(400).json({
        message: "Buy price is required"
      });
    }

    // Validate Rent
    if (
      (type === "RENT" || type === "BOTH") &&
      (rent_price === null ||
        rent_price === undefined ||
        rent_price === "")
    ) {
      return res.status(400).json({
        message: "Rent price is required"
      });
    }

    const result = await pool.query(
      `INSERT INTO products
       (
         name,
         description,
         category,
         type,
         image_url,
         buy_price,
         rent_price,
         rent_duration,
         owner_id
       )
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        name,
        description || null,
        category,
        type,
        image_url || null,
        buy_price || null,
        rent_price || null,
        rent_duration || null,
        owner_id
      ]
    );

    res.status(201).json({
      message: "Product added successfully",
      product: result.rows[0]
    });

  } catch (error) {
    console.error("Add product error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
});


// ==========================================
// GET ALL PRODUCTS
// ==========================================
router.get("/", async (req, res) => {
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
       JOIN students s
       ON p.owner_id = s.id
       ORDER BY p.created_at DESC`
    );

    res.status(200).json(result.rows);

  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
});


// ==========================================
// GET ONE PRODUCT
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

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
       JOIN students s
       ON p.owner_id = s.id
       WHERE p.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error("Get product error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
});


// ==========================================
// DELETE PRODUCT
// ==========================================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: result.rows[0]
    });

  } catch (error) {
    console.error("Delete product error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
});


module.exports = router;