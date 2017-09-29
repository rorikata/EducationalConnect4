'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Subcategory = mongoose.model('Subcategory');

router.route('/add')
    .post(function(req, res) {
        Subcategory.findOne({
            name: req.body.name
        }, function(err, subcat) {
            if(err) {
                throw err;
            }
            if(!subcat) {
                var newSubcat = new Subcategory({
                    name: req.body.name,
                    parentId: req.body.parentId
                });
                newSubcat.save(function(err) {
                    if(err) {
                        res.send({success: false, message: 'subcategory is already exists'});
                    }
                    res.json({success: true, message: 'successfully created new subcategory.'});
                })
            } else {
                res.send({success: false, message: 'subcategory is already exists'});
            }
        });
    });

router.route('/get')
    .post(function(req, res) {
            Subcategory.findOne({
                name: req.body.name,
                parentId: req.body.parentId
            }, function(err, subcat) {
                if(err) {
                    throw err;
                }
                if(!subcat) {
                    res.send({success: false, message: 'category does not exists'});
                }
                res.json({success: true, data: subcat});
            })
    });

router.route('/getSubcats')

    .post(function(req, res) {
        Subcategory.find({
            parentId: req.body.parentId
        }, function(err, subcats) {
            if(err) {
                throw err;
            }
            if(!subcats) {
                res.send({success: false, message: 'subcategory does not exists'});
            }
            res.json({success: true, data: subcats});
        });
    });


module.exports = router;
