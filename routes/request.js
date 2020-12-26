const router=require('express').Router();
const request=require('../schemas/request');
const frameworkUtil=require('../dependencies/framework');

router.route('/')
.post(function(req,res,next){
    if(frameworkUtil.isAuthorized("Request","","add",req)){
        return frameworkUtil.createDocument(request,req,res);
    }
    res.status(401).json({"message":"Unauthorized"});
})
.get(function(req,res,next){
    if(frameworkUtil.isAuthorized("Request","","view",req)){
        return frameworkUtil.getAllDocuments(request,req,res);
    }
    res.status(401).json({"message":"Unauthorized"});
});

router.route('/:id')
.put(function(req,res,next){
    if(frameworkUtil.isAuthorized("Request","","view",req)){
        return frameworkUtil.updateDocumentById(request,req,res);
    }
    res.status(401).json({"message":"Unauthorized"});
})
.get(function(req,res,next){
    if(frameworkUtil.isAuthorized("Request","","view",req)){
        return frameworkUtil.getDocumentById(request,req,res);
    }
    res.status(401).json({"message":"Unauthorized"});
});
module.exports=router;