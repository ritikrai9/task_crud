const express = require("express");
const {createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require("../controller/category.controller");

const categoryRouter = express.Router();

// Routes
categoryRouter.post("/", createCategory);      
categoryRouter.get("/all", getCategories);         
categoryRouter.get("/:id", getCategoryById);      
categoryRouter.put("/:id", updateCategory);        
categoryRouter.delete("/:id", deleteCategory);     

module.exports = categoryRouter;
