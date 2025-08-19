const express = require("express");
const cors = require("cors");

const categoryRouter = require("./routes/catetory.routes");
const SubCategoryRouter = require("./routes/subcatetories.routes");
const ProductRouter = require("./routes/products.routes");

const app = express();

// ✅ CORS config yaha likho
app.use(cors({
  origin: "http://localhost:5173",  // Vite frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("CORS Enabled Backend Running 🚀");
});

app.use("/category", categoryRouter);
app.use("/subcategory", SubCategoryRouter);
app.use("/products", ProductRouter);

module.exports = app;
