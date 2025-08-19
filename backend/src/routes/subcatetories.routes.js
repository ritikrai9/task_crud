const express = require("express");
const {createSubcategory, getSubcategories, updateSubcategory, deleteSubcategory} = require("../controller/subcategory.controller");

const SubCategoryRouter = express.Router();

SubCategoryRouter.post("/", createSubcategory); 
SubCategoryRouter.get("/", getSubcategories); 
SubCategoryRouter.patch("/:id",updateSubcategory); 
SubCategoryRouter.delete("/:id", deleteSubcategory); 

module.exports = SubCategoryRouter;

