'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var User = mongoose.model('User');

router.route('/add')
    // add question
    .post(function(req, res) {
        console.log(req.body);

        var question = new Question();
        question.userId = req.body.userId;
        question.category_type = req.body.category_type;
        question.subcategory_type = req.body.subcategory_type;
        question.checkMul = req.body.checkMul;
        question.text = req.body.text;
        console.log(typeof req.body.checkMul);
        if(req.body.checkMul === true) {
            // multiple chose question
            question.multiple_choice.a = req.body.mc_a;
            question.multiple_choice.b = req.body.mc_b;
            question.multiple_choice.c = req.body.mc_c;
            question.multiple_choice.ans = req.body.mc_ans;
            question.save(function(err, ques) {
                if(err) {
                    return res.send(500);
                }
                return res.json(ques);
            });
        } else if(req.body.checkMul === false) {
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
            console.log('error occur');
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
