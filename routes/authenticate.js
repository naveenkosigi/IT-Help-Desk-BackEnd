const router=require('express').Router();
const authenticator=require('../dependencies/authenticator');
const passport=require('passport');

router.post('/signup',(req,res) => {
    authenticator.signUp(req,res);
})

router.post('/login',passport.authenticate('local'),(req,res) => {
    authenticator.login(req,res);
})

module.exports=router;