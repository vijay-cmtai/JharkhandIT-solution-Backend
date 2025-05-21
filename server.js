require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// ✅ CORS Setup: Allow both local and deployed frontend
const allowedOrigins = [
  "http://localhost:8080",
  "https://jharkhand-it-sol-front.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

// ✅ JSON Body Parsing
app.use(express.json());

// ✅ Serve static files (e.g., uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
const { connect } = require("./config/database.js");
const portfolioRoutes = require("./Routes/portfolioRoutes.js");
const authRoutes = require("./Routes/auth.js");
const BlogsRoutes = require("./Routes/Blogs.js");
const contactRoute = require("./Routes/contactRoutes.js");
const serviceRoutes = require("./Routes/serviceRoutes.js");

app.use("/services", serviceRoutes);
app.use("/portfolio", portfolioRoutes);
app.use("/api/auth", authRoutes);
app.use("/blogs", BlogsRoutes);
app.use("/contact", contactRoute);

// ✅ Start server
const PORT = process.env.PORT || 5000;

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
