const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const { getUserFrom } = require('./utils/middleware');

const app = express();

const mongoUrl = config.MONGO_URL;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.use('/api/blog', blogsRouter);
app.use('/api/blog/user', getUserFrom, usersRouter);
app.use('/api/blog/login', getUserFrom, loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
