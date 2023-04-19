require("dotenv").config();
const express = require("express");
const mysql = require("mysql");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
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
