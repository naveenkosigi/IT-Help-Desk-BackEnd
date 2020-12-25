const frameworkUtil={};

frameworkUtil.createDocument=function(mongooseSchema,fields,callback){
    mongooseSchema.create(fields)
    .then(document => {
        console.log("Created Document ->",document);
        if(callback && callback instanceof Function){
            callback(document);
        }
    })
    .catch(err => {
        console.log("Failed to create a new document as the following error occured ->",err);
        callback(undefined,err);
    });

}

module.exports=frameworkUtil;