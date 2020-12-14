const permissionController={};
const permissions=require('../schemas/userPermissions');
const subModules=['note','history','tagged_users'];

permissionController.createUserPermissions=function(userId){
    try
  {
    return new Promise((res,rej) => {
        permissions.create({user:userId,submodule:''})
        .then((permission) => {
            subModules.forEach((value,index) => {
                permissions.create({user:userId,submodule:value})
                .then(() => {
                    console.log("created for submodule",value);
                    if(index == subModules.length-1){
                        res(console.log("Permissions created for user ",userId));
                    }
                })
            })
            return true;
        })
        .catch((err) => {
            rej(console.log("permissions not created ",err));
        })
    });    
 }
 catch(err){
        console.log("permissions not created ",err);
        return false;
 }
}

module.exports=permissionController;