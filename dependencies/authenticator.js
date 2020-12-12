const userCredential=require('../schemas/userCredential');
const userInfo=require('../schemas/userInfo');
const bodyParser=require('body-parser');
const passport=require('passport');
const jwt=require('jsonwebtoken');
const authenticator={};

authenticator.signUp=function(req,res){
    try{
        if(!req.body.email || req.body.email == null || req.body.email == ""){
            return res.status(500).send('The following error occured email id is mandatory');
        }
        userCredential.register(new userCredential({
            username:req.body.username
        }),req.body.password,(err) => {
            if(err){
                return res.status(500).send('The following error occured' + err);
            }
            passport.authenticate('local',{session:false},(req,res,info) => {
                console.log("info",info);
                return res.status(200).send("Successfully created a new account");
            });
        });
    }
    catch(err){
        return res.status(500).send('The following error occured' + err);
    }
};

authenticator.login=function(req,res,next){
    try{
        if(!req.body.username || !req.body.password){
            return res.status(400).send("Invalid input");
        }
        passport.authenticate('local',{session:false},(err,user) => {
            if(err || !user){
                return res.status(400).send("Invalid input");
            }
            req.login(user,{session:false},(err) => {
                if(err){
                    res.send("Login error",err);
                }

                const token=jwt.sign({id:user.id,username:user.username},'test');
                return res.json({user:user.username,token:token});
            });
        });
    }
    catch(err){
        return res.status(500).send('The following error occured' + err);
    }
}