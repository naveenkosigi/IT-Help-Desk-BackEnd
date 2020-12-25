const requester=require('../schemas/requester');

module.exports=async(id) => {
    console.log("Called validator");
    const user=await requester.findById(id);
    if(user)return true;
    return false;
}