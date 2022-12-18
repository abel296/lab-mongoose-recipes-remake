const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

(async () => {
  try {
    // Connection to the database "recipe-app"
    const self = await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log(`Connected to the database: "${ self.connection.name }"`)

    // Before adding any documents to the database, let's delete all previous entries
    self.connection.dropDatabase();
    
    // Create a recipe
    const recipeCreated = await Recipe.create({ title: 'Red curry rice', cuisine: 'Thailandese' })
    console.log('Recipe created: ', recipeCreated)

    // Create many recipes
    const recipesCreated = await Recipe.insertMany(data)
    console.log('Recipes created: ', recipesCreated)

    // Update a recipe
    const updatedRecipe = await Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
    console.log('Recipe updated: ', updatedRecipe)
    
    // Delete a recipe
    const deletedRecipe = await Recipe.deleteOne({ title: 'Carrot Cake' })
    console.log('Recipe deleted successfully: ', deletedRecipe)
    const currentRecipesList = await Recipe.find()
    console.log('Current recipes list: ', currentRecipesList)

  } catch (error) {
    console.error('Error connecting to the database', error)
    
  } finally {
    // Disconnect from the database "recipe-app"
    console.log('Disconnecting from the database')
    mongoose.connection.close(process.exit(0))
  }
})()