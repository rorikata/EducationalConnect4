'use strict';

var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
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
