const Entry = require('./models/phone-entry')

const name = process.argv[2]
const number = process.argv[3]

const retrieveAndPrint = () => {
  Entry.find({}).then((result) => {
    result.forEach(note => {
    console.log(note)
  })
  });
  Entry.countDocuments({}).then((num) => console.log(`There are ${num} documents`))
};

if (name !== '' && number !== '') {
  const entry = new Entry({ name, number });
  entry.save().then(() => retrieveAndPrint());
} else {
  retrieveAndPrint();
}
