'use strict';

var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    userId: String,
    category_type: String,
    subcategory_type: String,
    clickedUp: Number,
    clickedDown: Number,
    popular: Number,
    // answer_type is 0 or 1.
    // 0: multiple_choice
    // 1: true_false
    checkMul: Boolean,
    text: String,
    multiple_choice: {
            fake1: String,
            fake2: String,
            fake3: String,
            ans: String
        },
    diff: Number,
    ansRight: Number,
    totalAns: Number, 
    true_false: Boolean,
    created_at: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Question', questionSchema);
