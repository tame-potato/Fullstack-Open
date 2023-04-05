const logger = require('./logger');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  }

  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  }

  return next(error);
};

const getTokenFrom = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    request.auth = authorization.replace('Bearer ', '');
  }
  next();
};

const getUserFrom = (request, response, next) => {
  const { username, password } = request.body;
  if (username && password) {
    if (username.length > 3 && password.length > 3) {
      request.username = username;
      request.password = password;
    }
  }
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  getTokenFrom,
  getUserFrom,
};
