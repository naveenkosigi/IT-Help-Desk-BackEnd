const technician=require('../schemas/technician');

module.exports=async(id,opts) => {
    console.log("Called validator",this ,id,opts);
    const user=await technician.findById(id);
    if(user)return true;
    return false;
}