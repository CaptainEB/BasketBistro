const mongoose = require('mongoose');

const { Schema } = mongoose;

const listSchema = new Schema({
    recipes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Recipe'
        },
    ],
});

const List = mongoose.model('List', listSchema);

module.exports = List;