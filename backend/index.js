const app = require("./src/app");
const db = require("./src/db/db");
const mongoose = require('mongoose');

app.listen(5000, () => {
  console.log("Server is Running on port 5000");
});
