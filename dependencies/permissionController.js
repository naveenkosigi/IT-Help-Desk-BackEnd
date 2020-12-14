const permissionController={};
const permissions=require('../schemas/userPermissions');
const subModules=['note','history','tagged_users'];
const userInfo=require('../schemas/userInfo');

permissionController.createUserPermissions=function(userId){
    try
  { let permissionIds=[];
    return new Promise((res,rej) => {
        permissions.create({user:userId,submodule:''})
        .then((permission) => {
            permissionIds.push(permission._id);
            subModules.forEach((value,index) => {
                permissions.create({user:userId,submodule:value})
                .then((permission) => {
                    permissionIds.push(permission._id);
                    console.log("created for submodule",value);
                    if(index == subModules.length-1){
                        userInfo.findByIdAndUpdate(userId,{permissions : permissionIds})
                        .then(() => {
                            res(console.log("Permissions created for user ",userId));
                        });
                    }
                });
            });
            return true;
        })
        .catch((err) => {
            rej(console.log("permissions not created ",err));
        });
    });    
 }
 catch(err){
        console.log("permissions not created ",err);
        return false;
 }
}

module.exports=permissionController;