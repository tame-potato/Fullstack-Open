require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGO_URL;

mongoose.connect(url)
  .then(() => console.log('Succesfully connected to MongoDB!'));

const numberValidator = (val) => {
  const parts = val[0].split('-');
  if (parts.length !== 2) return false;
  const lenPre = parts[0].length;
  if (lenPre < 2 || lenPre > 3) return false;
  const lenAll = parts[1].length + lenPre;
  if (lenAll < 8) return false;
  if (!/^\d+$/.test(parts[0] + parts[1])) return false;
  return true;
};

const custom = [
  numberValidator,
  'VALIDATION_ERROR_NUMBER',
];

const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'VALIDATION_ERROR_NAME'],
    required: true,
  },
  number: {
    type: [String],
    validate: custom,
    required: true,
  },
});

entrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Entry', entrySchema);
