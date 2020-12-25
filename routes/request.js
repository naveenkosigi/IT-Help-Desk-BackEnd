const router=require('express').Router();
const request=require('../schemas/request');
const frameworkUtil=require('../dependencies/framework');

router.route('/')
.post(function(req,res,next){
    frameworkUtil.createDocument(request,req.body,function(document,err){
        if(document)res.json(document);
        else if(err)res.json(err);
    });
});

module.exports=router;