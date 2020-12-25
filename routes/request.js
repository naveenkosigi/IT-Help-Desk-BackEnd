const router=require('express').Router();
const request=require('../schemas/request');
const frameworkUtil=require('../dependencies/framework');

router.route('/')
.post(function(req,res,next){
    frameworkUtil.createDocument(request,req,res);
})
.get(function(req,res,next){
    frameworkUtil.getAllDocuments(request,req,res);
});

router.route('/:id')
.put(function(req,res,next){
    frameworkUtil.updateDocumentById(request,req,res);
})
.get(function(req,res,next){
    frameworkUtil.getDocumentById(request,req,res);
});
module.exports=router;