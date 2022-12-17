const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${ self.connection.name }"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  // Create a recipe
  // .then(() => Recipe.create({ title: 'Red curry rice', cuisine: 'Thailandese' }))
  // .then((response) => console.log(response))

  // Create many recipes
  .then(() => Recipe.insertMany(data))
  .then((response) => console.log(response))

  // Update a recipe
  .then(() => Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true }))
  .then((response) => console.log(response))

  // Delete a recipe
  .then(() => Recipe.deleteOne({ title: 'Carrot Cake' }))
  .then((response) => console.log(response))
  .then(() => Recipe.find())
  .then((response) => console.log(response))
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
