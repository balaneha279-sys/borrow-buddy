const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const testRoutes = require("./routes/testRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const requestRoutes = require("./routes/requestRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Route paths
app.use("/api/test", testRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/admin", adminRoutes);

// Test PostgreSQL connection
pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("PostgreSQL connected successfully!");
    console.log("Database time:", result.rows[0].now);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});