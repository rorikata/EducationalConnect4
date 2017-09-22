'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var User = mongoose.model('User');

router.use('./questions')

    // add question
    .post(function(req, res) {
        var question = new Question();
        question.userId = req.body.question.uerId;
        question.category.category_type = req.body.question.category.category_type;
        question.category.subcategory_type = req.body.question.category.subcategory_type;
        question.answer_type = req.body.question.answer_type;
        question.created_at = req.body.question.created_at;
        if(req.body.question.answer_type === 0) {
            // multiple chose question
            question.multiple_choice.a = req.body.question.multiple_choice.a;
            question.multiple_choice.b = req.body.question.multiple_choice.b;
            question.multiple_choice.c = req.body.question.multiple_choice.c;
            question.multiple_choice.d = req.body.question.multiple_choice.d;
            question.multiple_choice.ans = req.body.question.multiple_choice.ans;
            question.save(function(req, question) {
                if(err) {
                    return res.send(500);
                }
                return res.json(question);
            });
        } else if(req.body.question.answer_type === 1) {
            // true or false question
            question.true_false.ans = req.body.question.true_false.ans;
            question.save(function(req, question) {
                if(err) {
                    return res.send(500);
                }
                return res.json(question);
            });
        } else {
            // error
            return res.send(500);
        }
    })

    // get all questions.
    .get(function(req, res) {
        Question.find(function(err, questions) {
            if(err) {
                return res.send(500);
            }
            return res.json(questions);
        });
    });

module.exports = router;
