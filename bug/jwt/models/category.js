var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var autoIncrement = require('mongoose-auto-increment');
var config = require('../config/main');
var connection = mongoose.connect(config.database);
autoIncrement.initialize(connection);

// category schema
var CategorySchema = new mongoose.Schema({
    name: {
        type: String
    }
})

// subcategory schema
var SubcategorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    parentId: {
        type: Number
    }
})

CategorySchema.plugin(autoIncrement.plugin, 'category');
SubcategorySchema.plugin(autoIncrement.plugin, 'subcategory');

module.exports = mongoose.model('Category', CategorySchema);
module.exports = mongoose.model('Subcategory', SubcategorySchema);
