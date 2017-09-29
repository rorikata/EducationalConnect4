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
                    name: req.body.name
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
    })

module.exports = router;
