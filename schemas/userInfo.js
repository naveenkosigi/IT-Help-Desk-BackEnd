const mongoose=require('mongoose');
const schema=mongoose.Schema;

const userInfoSchema=new schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    extensionNo:{
        type:String
    }
});

module.exports=mongoose.model('userInfo',userInfoSchema);
