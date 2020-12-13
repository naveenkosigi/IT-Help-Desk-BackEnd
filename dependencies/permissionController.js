const permissionController={};
const permissions=require('../schemas/userPermissions');
const subModules=['note','history','tagged_users'];

permissionController.createUserPermissions=function(userId){
    try{
        permissions.create({user:userId,submodule:''})
        .then((permission) => {
            subModules.forEach((value) => {
                permissions.create({user:userId,submodule:value})
                .then(() => {
                    console.log("created for submodule",value);
                })
            })
            return true;
        })
        .catch((err) => {
            console.log("permissions not created ",err);
            return false;
        })
    }
    catch(err){
        console.log("permissions not created ",err);
        return false;
    }
}

module.exports=permissionController;