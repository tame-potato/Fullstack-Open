const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const { getTokenFrom } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blog = await Blog.find({}).populate('author');
  response.json(blog);
});

blogsRouter.post('/', getTokenFrom, async (request, response, next) => {
  try {
    const user = jwt.verify(request.auth, process.env.SECRET);
    request.body.author = user.id;
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', getTokenFrom, async (request, response, next) => {
  try {
    const user = jwt.verify(request.auth, process.env.SECRET);
    const blog = await Blog.findById(request.params.id);
    if (user.id === blog.author.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      response.status(401).end();
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', getTokenFrom, async (request, response, next) => {
  try {
    const user = jwt.verify(request.auth, process.env.SECRET);
    const blog = await Blog.findById(request.params.id);
    if (user.id === blog.author.toString()) {
      blog.title = request.body.title;
      blog.url = request.body.url;
      blog.likes = request.body.likes;
      const result = await Blog.findByIdAndUpdate(blog.id, blog, { new: true });
      response.json(result);
    } else {
      response.status(401).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
