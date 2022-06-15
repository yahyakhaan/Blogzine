const express = require('express');
const { createBlog, updateBlog, deleteBlog, getBlog, getBlogs, getUserBlogs } = require('../controllers/blog.js');
const Blog = require('../modals/Blog.js')
const createError = require('../utils/error.js');
const { verifyUser, verifyToken } = require('../utils/verify.js');
const router = express.Router();

//CREATE
router.post('/', verifyToken, createBlog)

//UPDATE
router.put('/:id', verifyToken, updateBlog)

//DELETE
router.delete('/:id', verifyToken, deleteBlog)

//GET
router.get('/:id', verifyToken, getBlog)
router.get('/user/:uid', verifyToken, getUserBlogs)

//GET ALL
router.get('/', getBlogs)

module.exports = router;