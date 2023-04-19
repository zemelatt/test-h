require("dotenv").config();
const express = require("express");
const mysql = require("mysql");

const app = express();
const port = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
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
