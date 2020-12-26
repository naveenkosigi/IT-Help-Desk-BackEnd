const e = require("express");

const frameworkUtil={};

frameworkUtil.createDocument=function(mongooseSchema,req,res){
    mongooseSchema.create(req.body)
    .then(document => {
        console.log("Created Document ->",document);
        res.json(document);
    })
    .catch(err => {
        res.json(err);
    });

}

frameworkUtil.getAllDocuments=function(mongooseSchema,req,res){
    mongooseSchema.find({})
    .then(documents => {
        res.json(documents);
    })
    .catch(err => {
        res.json(err);
    });
}

frameworkUtil.updateDocumentById=function(mongooseSchema,req,res){
    mongooseSchema.update({_id:req.params.id},{$set:req.body},{runValidators:true})
    .then(document => {
        mongooseSchema.findById(req.params.id)
        .then(document => {
            res.json(document);
        });
    })
    .catch(err => {
        res.json(err);
    });
}

frameworkUtil.getDocumentById=function(mongooseSchema,req,res){
    mongooseSchema.findById(req.params.id)
    .populate(req.body.populateFields)
    .then(document => {
        res.json(document);
    })
    .catch(err => {
        res.json(err);
    });
}

frameworkUtil.isAuthorized=function(parentModule,subModule,operation,request){
        let permissions=request.permissions;
        for(var i=0;permissions && permissions instanceof Array  && i<permissions.length;i++){
            let permission=permissions[i];
            if(permission.module == parentModule
                && permission.submodule == subModule
                && permission[operation] === true){
                    return true;
            }
        }
        return false;
}

module.exports=frameworkUtil;