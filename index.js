require("dotenv").config();
const express = require("express");
const mysql = require("mysql");

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
let db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});
db.connect((err) => {
  if (err) console.log(err);
  db.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      db.changeUser({ database: process.env.MYSQL_DATABASE }, (err) => {
        if (err) throw err;
      });
      console.log("Database created");
    }
  });
});

// db.changeUser(
//   {
//     database: process.env.Mydb,
//   },
//   (err) => {
//     if (err) {
//       console.log("Error in changing database", err);
//       return;
//     }
//   }
// );
// app.use(express.static(path.join(__dirname, "")));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname,'./clint/build/index.html'))
// })
var select = "insert into customers(name, address) values('zemelat','admin')";
var createSql =
  "CREATE TABLE IF NOT EXISTS customers (name VARCHAR(255), address VARCHAR(255))";
var All = "select * from customers";
app.get("/", (req, res) => {
  db.query(createSql, function (err, result) {
    if (err) throw err;
    db.query(select, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
  // res.send({ title: "Books" });
});

app.get("/all", (req, res) => {
  db.query(createSql, function (err, result) {
    if (err) throw err;
    db.query(All, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.listen(port, () => {
  console.log("started");
});
