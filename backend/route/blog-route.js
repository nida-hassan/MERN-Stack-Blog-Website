const express = require('express');
const {addBlog, deleteBlog, getAllBlogs, getById, getByUserId, updateBlog}= require("../controller/blog-controller");

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getById);//have to add blog id
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getByUserId);//have to add user id
module.exports = blogRouter;