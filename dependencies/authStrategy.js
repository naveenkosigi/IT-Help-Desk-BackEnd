const passport=require('passport');
const userCredential=require('../schemas/userCredential');
const passportJwt=require('passport-jwt');
const jwtStrategy=passportJwt.Strategy;
const extractJwt=passportJwt.ExtractJwt;
const localStrategy=require('passport-local').Strategy;

passport.use(new localStrategy({},userCredential.authenticate()));
passport.serializeUser(userCredential.serializeUser());
passport.deserializeUser(userCredential.deserializeUser());
passport.use(new jwtStrategy({
                jwtFromRequest:extractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey:'test'
            },
            (payLoad,callback) => {
                return userCredential.findById(payLoad.id)
                       .then((user) => {
                           return callback(null,user);
                       })
                       .catch((err) => {
                           return callback(err);
                       }) 
            }

));

