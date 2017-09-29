'use strict';

var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    userId: '',
    category_type: String,
    subcategory_type: String,
    // answer_type is 0 or 1.
    // 0: multiple_choice
    // 1: true_false
    answer_type: '',
    q: String,
    multiple_choice: {
            a: String,
            b: String,
            c: String,
            ans: String
        },
    true_false: '',
    created_at: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Question', questionSchema);
