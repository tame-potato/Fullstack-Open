const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Entry = require('./models/phone-entry');

const app = express();

morgan.token('payload', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :payload'));
app.use(cors());
app.use(express.json());
app.use(express.static('./build'));

// Get info route
app.get('/api/phonebook/info', (request, response) => {
  Entry.countDocuments({}).then((count) => {
    response.send(`There are ${count} phone book entries.<br/> ${request._startTime}`);
  });
});

// Get all route
app.get('/api/phonebook', (request, response) => {
  Entry.find({}).then((entries) => {
    response.json(entries);
  });
});

// Get by id route
app.get('/api/phonebook/:id', (request, response, next) => {
  Entry.findById(request.params.id)
    .then((entry) => {
      if (entry) {
        response.json(entry);
      } else {
        // If the Id is not malformed but does not match any entries return 404 instead of null
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Put route
app.put('/api/phonebook/:id', (request, response, next) => {
  const entryUpdate = {
    name: request.body.name,
    number: request.body.number,
  };

  Entry.findByIdAndUpdate(request.params.id, entryUpdate, { new: true })
    .then((updatedEntry) => {
      response.json(updatedEntry);
    })
    .catch((error) => next(error));
});

// Post route
app.post('/api/phonebook', (request, response, next) => {
  const entry = new Entry({
    name: request.body.name,
    number: request.body.number,
  });

  entry.save()
    .then((newEntry) => {
      response.json(newEntry);
    })
    .catch((error) => next(error));
});

// Delete by id route
app.delete('/api/phonebook/:id', (request, response, next) => {
  Entry.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// Bad route handler
app.use((request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed Id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  return next(error);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
