'use strict';

var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    userId: String,
    category_type: String,
    subcategory_type: String,
    // answer_type is 0 or 1.
    // 0: multiple_choice
    // 1: true_false
    checkMul: Boolean,
    text: String,
    multiple_choice: {
            a: String,
            b: String,
            c: String,
            ans: String
        },
    true_false: Boolean,
    created_at: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Question', questionSchema);
