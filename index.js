require("dotenv").config();
const express = require("express");
const mysql = require("mysql");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const db = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
module.exports = db;
db.connect((err) => {
  if (err) console.log(err);
  console.log("db connected");
});

app.get("/", (req, res) => {
  res.send({ title: "Books" });
});
app.listen(port);
