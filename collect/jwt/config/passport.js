var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/user');
var config = require('../config/main');

module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        //console.log(jwt_payload.data._id);
        User.findById(jwt_payload.data._id, function(err, user) {
            //console.log("here");
            if(err) {
                return done(err, false);
            }
            //console.log(user);
            //console.log("here");
            if(user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};
