const router=require('express').Router();
const permissions=require('../schemas/userPermissions');

router.route('/')
.get(function(req,res,next){
    permissions.find({user:req.user._id})
    .then(permissions => {
        res.json(permissions);
    })
    .catch(err => {
       res.json(err); 
    })
});

module.exports=router;