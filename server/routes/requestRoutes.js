const express = require("express");
const pool = require("../config/db");

const router = express.Router();


// ==========================================
// CREATE REQUEST
// ==========================================
router.post("/", async (req, res) => {
  try {
    const {
      product_id,
      requester_id,
      request_type
    } = req.body;

    if (!product_id || !requester_id || !request_type) {
      return res.status(400).json({
        message: "Product, requester and request type are required"
      });
    }

    // Get product and owner
    const productResult = await pool.query(
      `SELECT id, owner_id, name, type
       FROM products
       WHERE id = $1`,
      [product_id]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const product = productResult.rows[0];

    // Prevent owner from requesting own product
    if (Number(product.owner_id) === Number(requester_id)) {
      return res.status(400).json({
        message: "You cannot request your own product"
      });
    }

    // Check whether request type is allowed
    if (
      request_type === "BUY" &&
      !["BUY", "BOTH"].includes(product.type)
    ) {
      return res.status(400).json({
        message: "This product is not available for buying"
      });
    }

    if (
      request_type === "RENT" &&
      !["RENT", "BOTH"].includes(product.type)
    ) {
      return res.status(400).json({
        message: "This product is not available for renting"
      });
    }

    if (
      request_type === "SHARE" &&
      product.type !== "SHARE"
    ) {
      return res.status(400).json({
        message: "This product is not available for sharing"
      });
    }

    // Check duplicate pending request
    const existingRequest = await pool.query(
      `SELECT id
       FROM requests
       WHERE product_id = $1
       AND requester_id = $2
       AND request_type = $3
       AND status = 'PENDING'`,
      [
        product_id,
        requester_id,
        request_type
      ]
    );

    if (existingRequest.rows.length > 0) {
      return res.status(400).json({
        message: "You already have a pending request for this product"
      });
    }

    // Create request
    const result = await pool.query(
      `INSERT INTO requests
       (
         product_id,
         requester_id,
         owner_id,
         request_type
       )
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [
        product_id,
        requester_id,
        product.owner_id,
        request_type
      ]
    );

    res.status(201).json({
      message: "Request sent successfully",
      request: result.rows[0]
    });

  } catch (error) {
    console.error("Create request error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
});


// ==========================================
// MY REQUESTS
// ==========================================
router.get("/my/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT
        r.id,
        r.request_type,
        r.status,
        r.created_at,

        p.id AS product_id,
        p.name AS product_name,
        p.image_url,
        p.category,

        s.name AS owner_name,
        s.email AS owner_email

       FROM requests r

       JOIN products p
       ON r.product_id = p.id

       JOIN students s
       ON r.owner_id = s.id

       WHERE r.requester_id = $1

       ORDER BY r.created_at DESC`,
      [userId]
    );

    res.status(200).json(result.rows);

  } catch (error) {
    console.error("Get my requests error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
});


// ==========================================
// INCOMING REQUESTS
// ==========================================
router.get("/incoming/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT
        r.id,
        r.request_type,
        r.status,
        r.created_at,

        p.id AS product_id,
        p.name AS product_name,
        p.image_url,

        s.name AS requester_name,
        s.email AS requester_email

       FROM requests r

       JOIN products p
       ON r.product_id = p.id

       JOIN students s
       ON r.requester_id = s.id

       WHERE r.owner_id = $1

       ORDER BY r.created_at DESC`,
      [userId]
    );

    res.status(200).json(result.rows);

  } catch (error) {
    console.error("Get incoming requests error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
});


// ==========================================
// APPROVE / REJECT REQUEST
// ==========================================
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const result = await pool.query(
      `UPDATE requests
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    res.status(200).json({
      message: `Request ${status.toLowerCase()} successfully`,
      request: result.rows[0]
    });

  } catch (error) {
    console.error("Update request error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
});


module.exports = router;