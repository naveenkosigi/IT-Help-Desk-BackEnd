const userCredential=require('../schemas/userCredential');
const userInfo=require('../schemas/userInfo');
const bodyParser=require('body-parser');
const passport=require('passport');
const jwt=require('jsonwebtoken');
const permissionController=require('./permissionController');
const authenticator={};

authenticator.signUp=function(req,res){
    try{
        userInfo.create(req.body)
        .then(user => {
            if(user){
                userCredential.register(new userCredential({
                    username:req.body.username,
                }),req.body.password,(err) => {
                    console.log("inside success");
                    if(err){
                        console.log("inside error");
                        userInfo.findByIdAndDelete(user._id)
                        .then((user) => {
                            console.log("deleted");
                            return res.status(500).send('The following error occured' + err);
                        })
                        .catch(err => {
                            return res.status(500).send('The following error occured' + err);
                        })
                    }
                    else{
                        permissionController.createUserPermissions(user._id)
                        .then(() => {
                            return res.status(200).send("Successfully created a new account");
                        })
                        .catch((err) => {
                            return res.status(500).send('The following error occured while creating user permissions' + err);
                        })
                    }
                });
            }
        })
        .catch((err) => {
            return res.status(500).send('The following error occured' + err);
        });
        
        
        /*
        userCredential.register(new userCredential({
            username:req.body.username,
        }),req.body.password,(err) => {
            console.log("inside success");
            if(err){
                console.log("inside error");
                return res.status(500).send('The following error occured' + err);
            }
            return res.status(200).send("Successfully created a new account");
        });
        */
    }
    catch(err){
        return res.status(500).send('The following error occured' + err);
    }
};

authenticator.login=function(req,res,next){
    try{
        console.log("called login");
        if(!req.body.username || !req.body.password){
            return res.status(400).send("Invalid input");
        }
        if(req.user){
            const token=jwt.sign({id:req.user.id,username:req.user.username},'test');
            return res.json({user:req.user.username,token:token});
        }
    }
    catch(err){
        return res.status(500).send('The following error occured' + err);
    }
}

module.exports=authenticator
