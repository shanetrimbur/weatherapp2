require("dotenv").config();
const express = require("express");
const app = express();
const weatherRoutes = require("./routes/weather");
app.use("/api/weather", weatherRoutes);
app.listen(3000, () => console.log("Server running on port 3000"));

