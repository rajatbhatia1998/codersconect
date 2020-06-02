const JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User')
const {secret} = require('../config/keys')


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = passport => {
            passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
            User.findById(jwt_payload.id)
            .then(user=>{
                if(user){
                    return done(null,user)
                }
                return done(null,user)
            })
            .catch(err=>console.log(err))

}));
}