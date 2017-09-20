'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var config = require('../config/main');

module.exports = function(passport) {
	router.post('/register', function(req, res) {
		if(!req.body.email || !req.body.password) {
			res.json({success: false, message: 'Please enter an email and password to register.'});
		} else {
			var newUser = new User({
				email: req.body.email,
				password: req.body.password
			});
			// Attempt to save the new users
			newUser.save(function(err) {
				if(err) {
					return res.json({ success: false, message: 'That email address already exists.'});
				}
				res.json({ success: true, message: 'successfully created new user.'});
			});
		}
	});

	router.post('/token', function(req, res) {
		User.findOne({
			email: req.body.email
		}, function(err, user) {
			if(err) {
				throw err;
			}
			if(!user) {
				res.send({success: false, message: 'Authentication failed. User not found.'});
			} else {
				// check if the password matches
				user.comparePassword(req.body.password, function(err, isMatch) {
					if(isMatch && !err) {
						// create the token
						var token = jwt.sign({data: user}, config.secret, {
							expiresIn: 10080 // in seconds
						});
						res.json({success: true, token: 'JWT ' + token });
					} else {
						res.send({ success: false, message: 'Authentication failed. Passwords did not match'});
					}
				});
			}
		});
	});

	// protect dashboard route with jwt
	router.get('/dashboard', passport.authenticate('jwt', { session: false}), function(req, res) {
		res.send('It worked! User id is: ' + req.user._id + '.');
		return res.redirect('/top');
	});

	return router;
};
