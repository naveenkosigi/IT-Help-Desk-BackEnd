const router=require('express').Router();
const permissions=require('../schemas/userPermissions');

router.route('/')
.get(function(req,res,next){
    res.json(req.permissions);
});

module.exports=router;