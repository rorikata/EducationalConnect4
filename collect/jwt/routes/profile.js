'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.route('/updateNickname')
    .post(function(req, res) {
        console.log(req.body);
        var nickname = req.body.nickname;
        var userId = req.body.id;
        User.findById(userId, function(err, userData) {
            console.log(userData);
            var user = userData;
            user.nickname = nickname;
            user.save(function(err, user) {
                if(err) {
                    return res.send(500, err);
                }
                return res.json(user);
            });
        })
    });

module.exports = router;
