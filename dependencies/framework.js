const e = require("express");

const frameworkUtil={};

frameworkUtil.createDocument=function(mongooseSchema,req,res){
    mongooseSchema.create(req.body)
    .then(document => {
        console.log("Created Document ->",document);
        res.json(document);
    })
    .catch(err => {
        res.status(406).json(err);
    });

}

frameworkUtil.getAllDocuments=function(mongooseSchema,req,res){
    mongooseSchema.find({})
    .then(documents => {
        if(documents){
            res.json(documents);
        }
        else{
            res.status(406).json({"MESSAGE":"Invalid id"});
        }    
    })
    .catch(err => {
        res.status(406).json(err);
    });
}

frameworkUtil.updateDocumentById=function(mongooseSchema,req,res){
    mongooseSchema.update({_id:req.params.id},{$set:req.body},{runValidators:true})
    .then(document => {
        mongooseSchema.findById(req.params.id)
        .then(document => {
            if(document){
                res.json(document);
            }
            else{
                res.status(406).json({"MESSAGE":"Invalid id"});
            }
        });
    })
    .catch(err => {
        res.status(406).json(err);
    });
}

frameworkUtil.getDocumentById=function(mongooseSchema,req,res){
    mongooseSchema.findById(req.params.id)
    .populate(req.body.populateFields)
    .then(document => {
        if(document){
            res.json(document);
        }
        else{
            res.status(406).json({"MESSAGE":"Invalid id"});
        }
    })
    .catch(err => {
        res.status(406).json(err);
    });
}

frameworkUtil.isAuthorized=function(module,subModule,operation,request){
        let permissions=request.permissions;
        for(var i=0;permissions && permissions instanceof Array  && i<permissions.length;i++){
            let permission=permissions[i];
            if(permission.module === module
                && permission.submodule === subModule
                && permission[operation] === true){
                    return true;
            }
        }
        return false;
}

frameworkUtil.deleteDocumentById=function(mongooseSchema,req,res){
    mongooseSchema.deleteOne({_id:req.params.id})
    .then(deletedInfo => {
        if(deletedInfo){
            res.json(deletedInfo);
        }
        else{
            res.status(406).json({"MESSAGE":"Invalid id"});
        }
    })
    .catch(err => {
        res.status(406).json(err);
    })
}

frameworkUtil.getSubDocumentsByParentId=async(mongooseSchema,subDocumentName,subDocumentSchema,req,res) => {
    let document=await mongooseSchema.findById(req.params.id).populate(subDocumentName);
    if(document[subDocumentName]){
        res.status(200).send({[subDocumentName]:document[subDocumentName]});
    }
    else{
        res.status(200).json([]);
    }
}

frameworkUtil.createSubDocumentByParentId=function(mongooseSchema,subDocumentName,subDocumentSchema,req,res){
    try{
        mongooseSchema.findById(req.params.id)
        .then(document => {
            subDocumentSchema.create(req.body)
            .then(subDocument => {
                mongooseSchema.update({_id:document._id},{$push:{notes:subDocument._id}})
                .then(updatedDocument => {
                    res.status(200).json(updatedDocument);
                });
            });
        });
    }
    catch(err){
        res.status(406).json(err);
    }
}

module.exports=frameworkUtil;