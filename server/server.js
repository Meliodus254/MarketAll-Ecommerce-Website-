const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

// app
const app = express();

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// CORS middleware setup (removed redundant usage)
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.56.1:3000'],  // Add all your frontend origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // if you need cookies or authorization headers
}));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));

// db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

// routes middleware
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// port configuration
const port = process.env.PORT || 8000;

// start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
