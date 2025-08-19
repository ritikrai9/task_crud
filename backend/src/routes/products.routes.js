const express = require("express");
const { createProduct, updateProduct, deleteProduct, getProducts } = require("../controller/products.controller");

const ProductRouter = express.Router();

ProductRouter.get("/", getProducts);  
ProductRouter.post("/", createProduct);     
ProductRouter.patch("/:id", updateProduct);   
ProductRouter.delete("/:id", deleteProduct); 

module.exports = ProductRouter;
