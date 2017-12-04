'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var config = require('../config/main');

module.exports = function(passport) {
	router.post('/register', function(req, res) {
		if(!req.body.email || !req.body.password || !req.body.nickname) {
			res.json({success: false, message: 'Please enter an email, password and nickname to register.'});
		} else {
			User.findOne({
				email: req.body.email
			}, function(err, user) {
				if(err) {
					throw err;
				}
				if(!user) {
					var newUser = new User({
						email: req.body.email,
						password: req.body.password,
						nickname: req.body.nickname
					});
					// Attempt to save the new users
					console.log('here');
					newUser.save(function(err) {
						if(err) {
							res.json({ success: false, message: 'That email address already exists.'});
						}
						res.json({ success: true, message: 'successfully created new user.'});
					});
				} else {
					res.json({ success: false, message: 'That email address already exists.'});
				}

			});
		}
	});

	router.post('/login', function(req, res) {
		if(req.body.email === '' || req.body.password === '') {
			res.send({success: false, message: 'Please fill out the fileds!'});
		} else {
			User.findOne({
				email: req.body.email
			}, function(err, user) {
				if(err) {
					throw err;
				}
				if(!user) {
					res.send({success: false, message: 'User not found.'});
				} else {
					// check if the password matches
					user.comparePassword(req.body.password, function(err, isMatch) {
						if(isMatch && !err) {
							// create the token
							// there was a bug if I use user instead of {data: user}.
							var token = jwt.sign({data: user}, config.secret, {
								expiresIn: 10080 // in seconds
							});
							res.json({success: true, token: 'JWT ' + token });
						} else {
							res.send({ success: false, message: 'Passwords did not match'});
						}
					});
				}
			});
		}
	});

	// protect dashboard route with jwt
	router.get('/authToken', passport.authenticate('jwt', { session: false}), function(req, res) {
		//res.send('It worked! User id is: ' + req.user._id + '.');
		var user_info = {
			nickname: ''
		}
		User.findById(req.user._id, function(err, user) {
			if(err) {
				res.send(err);
			}
			//user_info.nickname = user.nickname;
			res.send(user);
		})
		//return res.json({success: true});
	});

	return router;
};
