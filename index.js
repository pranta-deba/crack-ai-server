const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { connect } = require("./utils/dbConnect");

//! Global Middleware
app.use(cors());
app.use(express.json());

//! DB Connection
connect();

//! Routes
app.get("/", (req, res) => {
  res.send({ data: "Server is running", status: 200 });
});

//! Start Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
