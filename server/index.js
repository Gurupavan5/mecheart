const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth"); // <-- MOVE this here, before app.use
const verifyToken = require("./middleware/authMiddleware"); // <-- Import the auth middleware
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); // <-- Also fixed the path to "/api/auth"

app.get("/api/machine", verifyToken, (req, res) => {
  const data = {
    temperature: (20 + Math.random() * 30).toFixed(2),
    rpm: Math.floor(1000 + Math.random() * 500),
    voltage: (220 + Math.random() * 10).toFixed(1),
    vibration: (0.1 + Math.random() * 2.0).toFixed(2),
    power: (Math.random() * 1000).toFixed(0),
    status: "Running",
    timestamp: new Date(),
  };
  res.json(data);
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
