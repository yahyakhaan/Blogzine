const Blog = require("../modals/Blog");
const pageChecker = require('../utils/pageChecker')

const createBlog = async (req, res, next) => {
    const newBlog = new Blog(req.body);

    try {
        const savedBlog = await newBlog.save();
        res.status(200).json(savedBlog);
    } catch (err) {
        next(err)
    }
}

const updateBlog = async (req, res, next) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedBlog);
    } catch (err) {
        next(err);
    }
}

const deleteBlog = async (req, res, next) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json("The Blog has been deleted!");
    } catch (err) {
        next(err);
    }
}

const getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.status(200).json(blog);
    } catch (err) {
        next(err);
    }
}

const getUserBlogs = async (req, res, next) => {
    try {
        const blog = await Blog.find({ uid: req.params.uid });

        res.status(200).json(blog);
    } catch (err) {
        next(err);
    }
}  

const getBlogs = async (req, res, next) => {

    try {

        const page = req.query.p
        
        if (page) {

            const maxBlogs = 5;
            var pages = 0
            // const end = req.query.e
            const blogs = await Blog.find();
            // console.log(start, end)
    
            const mod = blogs.length % maxBlogs
    
            if (mod == 0) {
                pages = Math.trunc(blogs.length / maxBlogs)
            }
            else {
                pages = Math.trunc(blogs.length / maxBlogs) + 1
            }
    
            const start = pageChecker(page, maxBlogs, blogs.length, mod)
    
            let end = 0
    
            if (page * maxBlogs <= blogs.length) {
                end = start + maxBlogs
            }
            else {
                end = blogs.length
            }
    
            // console.log(start, end)

            res.status(200).json(
                {
                    blogs: blogs.slice(start, end),
                    length: blogs.length,
                    pages: pages
                }
            )
        }
        else
            res.status(200).json(blogs);
    } catch (err) {
        next(err);
    }
}

module.exports = { createBlog, updateBlog, deleteBlog, getBlog, getUserBlogs, getBlogs }