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
  database: process.env.MYSQL_DATABASE,
});
db.connect((err) => {
  if (err) console.log(err);
  console.log("db connected");
});

// app.use(express.static(path.join(__dirname,'')))
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname,'./clint/build/index.html'))
// })

app.get("/", (req, res) => {
  res.send({ title: "Books" });
});
app.listen(port, () => {
  console.log("started");
});
