'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Category = mongoose.model('Category');


router.route('/add')
    // add question
    .post(function(req, res) {
            Category.findOne({
                name: req.body.name
            }, function(err, cat) {
                if(err) {
                    throw err;
                }
                if(!cat) {
                    var newCat = new Category({
                        name: req.body.name
                    });
                    newCat.save(function(err) {
                        if(err) {
                            res.send({success: false, message: 'category is already exists'});
                        }
                        res.json({ success: true, message: 'successfully created new category.'});
                    })
                } else {
                    res.send({success: false, message: 'category is already exists'});
                }
            });
    });

router.route('/get')
    // get all questions.
    .post(function(req, res) {
        Category.findOne({
            name: req.body.name
        }, function(err, cat) {
            if(err) {
                throw err;
            }
            if(!cat) {
                res.send({success: false, message: 'category does not exists'});
            }
            res.json({success: true, data: cat});
        })
    });

module.exports = router;
