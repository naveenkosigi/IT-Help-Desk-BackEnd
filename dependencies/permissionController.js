const permissionController={};
const permissions=require('../schemas/userPermissions');
const subModules=['notes','history','tagged_users'];
const technician=require('../schemas/technician');
const requester=require('../schemas/requester');

permissionController.createUserPermissions=function(userId,isTechnician){
    try
  { let permissionIds=[];
    if(isTechnician === true){
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
                            technician.findByIdAndUpdate(userId,{permissions : permissionIds})
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
    else{
        return new Promise((res,rej) => {
            permissions.create({user:userId,submodule:'',add:true,view:true,edit:false})
            .then((permission) => {
                permissionIds.push(permission._id);
                subModules.forEach((value,index) => {
                    permissions.create({user:userId,submodule:value,add:true,view:true,edit:false})
                    .then((permission) => {
                        permissionIds.push(permission._id);
                        console.log("created for submodule",value);
                        if(index == subModules.length-1){
                            requester.findByIdAndUpdate(userId,{permissions : permissionIds})
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
    
 }
 catch(err){
        console.log("permissions not created ",err);
        return false;
 }
}

module.exports=permissionController;