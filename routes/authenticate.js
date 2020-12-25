const router=require('express').Router();
const authenticator=require('../dependencies/authenticator');
const passport=require('passport');

router.post('/signup',(req,res) => {
    authenticator.signUp(req,res);
})

router.post('/login',passport.authenticate('local'),(req,res) => {
    authenticator.login(req,res);
})

/*
router.route('/logout')
.get(passport.authenticate('jwt',{session:true}),(req, res, next) => {
  console.log(req.session);
  if (req.session.passport && req.session.passport.user) {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie('session-id');
        res.json({
          message: 'You are successfully logged out!'
        });
      }
    });
  } else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});
*/

module.exports=router;