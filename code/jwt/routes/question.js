'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var User = mongoose.model('User');

router.route('/add')
    // add question
    .post(function(req, res) {
        console.log(req.body.userId);

        var question = new Question();
        question.userId = req.body.userId;
        question.category_type = req.body.category_type;
        question.subcategory_type = req.body.subcategory_type;
        question.answer_type = req.body.answer_type;
        if(req.body.answer_type === '0') {
            // multiple chose question
            question.q = req.body.q;
            question.multiple_choice.a = req.body.mc_a;
            question.multiple_choice.b = req.body.mc_b;
            question.multiple_choice.c = req.body.mc_c;
            question.multiple_choice.ans = req.body.mc_ans;
            console.log(question);
            question.save(function(err, ques) {
                if(err) {
                    return res.send(500);
                }
                return res.json(ques);
            });
        } else if(req.body.answer_type === '1') {
            // true or false question
            question.true_false = req.body.true_false;
            question.save(function(err, ques) {
                if(err) {
                    return res.send(500);
                }
                return res.json(ques);
            });
        } else {
            // error
            return res.send(500);
        }

    });

    
router.route('/get')
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
