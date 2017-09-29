'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = mongoose.model('Category');
var User = mongoose.model('User');

router.route('/category')
    // add question
    .post(function(req, res) {

    })
    // get all questions.
    .get(function(req, res) {

    });

router.route('/subcategory')

module.exports = router;
