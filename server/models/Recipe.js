const mongoose = require('mongoose');

const { Schema } = mongoose;

const ingredientSchema = new mongoose.Schema({
    ingredientName: String,
    amount: Number,
});

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    ingredients: [ingredientSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;