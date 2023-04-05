const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs');
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  if (request.username && request.password) {
    const name = request.username;
    const pswdhash = await bcrypt.hash(request.password, 10);
    const user = new User({ name, pswdhash });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } else {
    response.status(400).json({ error: 'INVALID_INPUT' }).end();
  }
});

module.exports = usersRouter;
