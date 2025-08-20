const express = require("express");
const {createSubcategory, getSubcategories, updateSubcategory, deleteSubcategory, getSubcategoryById, getSubcategoryByCategoryId} = require("../controller/subcategory.controller");

const SubCategoryRouter = express.Router();

SubCategoryRouter.post("/", createSubcategory); 
SubCategoryRouter.get("/", getSubcategories); 
SubCategoryRouter.get("/:id",getSubcategoryById); 
SubCategoryRouter.get("/category/:id", getSubcategoryByCategoryId);
SubCategoryRouter.put("/:id",updateSubcategory); 
SubCategoryRouter.delete("/:id", deleteSubcategory); 

module.exports = SubCategoryRouter;

