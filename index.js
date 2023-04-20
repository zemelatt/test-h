require("dotenv").config();
const express = require("express");
const mysql = require("mysql");

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  // database: process.env.MYSQL_DATABASE,
});
db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  db.query("CREATE DATABASE IF NOT EXISTS Mydb", (err, result) => {
    if (err) throw err;
    console.log("db created");
  });
});

//
// app.use(express.static(path.join(__dirname, "")));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname,'./clint/build/index.html'))
// })
var createSql =
  "CREATE TABLE IF NOT EXISTS customers (name VARCHAR(255), address VARCHAR(255))";
var All = "select * from customers";
app.get("/all", (req, res) => {
  db.query(All, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
  // res.send({ title: "Books" });
});
var select = "insert into customers(name, address) values('zemelat','admin')";
app.get("/", (req, res) => {
  db.query(select, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
  // res.send({ title: "Books" });
});
app.listen(port, () => {
  console.log("started");
});
