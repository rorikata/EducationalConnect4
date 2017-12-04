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
        Question.findOne({
            text: req.body.text
        }, function(err, q) {
            if(!q) {
                question.userId = req.body.userId;
                question.category_type = req.body.category_type;
                question.subcategory_type = req.body.subcategory_type;
                question.checkMul = req.body.checkMul;
                question.text = req.body.text;
                question.popular = 0;
                question.clickedUp = 0;
                question.clickedDown = 0;
                question.diff = 0;
                question.ansRight = 0;
                question.totalAns = 0;
                console.log(typeof req.body.checkMul);
                if(req.body.checkMul === true) {
                    // multiple chose question
                    question.multiple_choice.fake1 = req.body.fake1;
                    question.multiple_choice.fake2 = req.body.fake2;
                    question.multiple_choice.fake3 = req.body.fake3;
                    question.multiple_choice.ans = req.body.ans;
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

            } else {
                res.send({success: false, message: 'question is already exists'});
            }
        })


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

router.route('/addReview')
    .post(function(req, res) {
        console.log(req.body);
        var userId = req.body.userId;
        var reviews = req.body.ids;
        User.findById(userId, function(err, user) {
            console.log(user);
            var newUser = user;
            console.log('check');
            console.log(newUser.reviews.length);
            if(newUser.reviews.length !== 0) {
                for(var i = 0; i < newUser.reviews.length; i++) {
                    var exist = false;
                    var num = 0;
                    for(var j = 0; j < reviews.length; j++) {
                        if(newUser.reviews[i] === reviews[j]) {
                            exist = true;
                            num = j;
                        }
                    }
                    if(!exist) {
                        newUser.reviews.push(reviews[num]);
                    }
                }
            } else {
                newUser.reviews = reviews;
            }
            console.log(newUser.reviews);
            newUser.save(function(err, newU) {
                if(err) {
                    return res.send(500, err);
                }
                return res.json(newU);
            })
        })
    });

router.route('/update')
    .post(function(req, res) {
        console.log(req.body);
        console.log(req.body.popular);
        var popular = req.body.popular;
        var questionId = req.body._id;
        Question.findById(questionId, function(err, q) {
            console.log(q);
            var newQ = q;
            newQ.popular = popular;
            newQ.save(function(err, newQ) {
                if(err) {
                    return res.send(500, err);
                }
                return res.json(newQ);
            });
        })
    });

module.exports = router;
