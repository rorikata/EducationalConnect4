'use strict';

var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    category: [{
        category_type: String,
        subcategory_type: String
    }],
    // answer_type is 0 or 1.
    // 0: multiple_choice
    // 1: true_false
    answer_type: {
        type: String,
        required: true
    },
    question: String,
    multiple_choice: [{
            a: String,
            b: String,
            c: String,
            d: String,
            ans: String
        }],
    true_false: [{
            ans: String
        }],
    created_at: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Question', questionSchema);
