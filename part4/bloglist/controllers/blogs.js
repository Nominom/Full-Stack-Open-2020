const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const logger = require('../utils/logger');
const config = require('../utils/config');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid',
    });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    ...request.body,
    user: user._id,
  });
  result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const newLikes = request.body.likes;
  await Blog.findByIdAndUpdate(id, { likes: newLikes });
  response.status(200).end();
});

module.exports = blogsRouter;
