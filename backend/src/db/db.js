const mysql = require("mysql2");


const db = mysql.createConnection({
  host: "localhost",     
  user: "root",         
  password: "12345",          
  database: "crud"  , 
  port : 3306  
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ");
    return;
  }
  console.log("Connected to MySQL database.");
});

module.exports = db;
