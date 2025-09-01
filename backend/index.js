const app = require("./src/app");
const db = require("./src/db/db");

app.listen(5000, () => {
  console.log("Server is Running on port 5000");
});
