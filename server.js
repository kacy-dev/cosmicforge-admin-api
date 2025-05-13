require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const mongoDBConnection = require("./config/db");
const adminRoute = require("./routes/adminRoute");


const app = express();

const allowedOrigins = [
  "http://127.0.0.1:5500",
  "https://cosmicforge-admin.vercel.app"
];

// Middleware
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    origin: allowedOrigins,
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));

// Swagger Documentation

// Connect to MondoDB
mongoDBConnection();

// Routes
app.use("/api/v1/cosmicforge", adminRoute);


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully.",
  });
});

// Global Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server connected successfully on http://localhost:${PORT}`);
});
