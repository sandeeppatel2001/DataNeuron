const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const { db_connect } = require("./database");
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3001;
const componentRoute = require("./routes/component.route");
app.use(componentRoute);
const __dirname1 = path.resolve();
// console.log(__dirname1);
app.get("/home", (req, res) => {
  app.use(express.static(path.join(__dirname1, "./build/")));
  res.sendFile(path.join(__dirname1, "./build/index.html"));
  // res.sendFile(({ root: __dirname }, "../build/index.html"));
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  db_connect();
});
