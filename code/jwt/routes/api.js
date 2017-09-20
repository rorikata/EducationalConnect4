var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var User = mongoose.model('User');

router.use('./questions')
    .post(function(req, res) {
        var question = new Question();


    });

module.exports = router;
