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

export default mongoose.model('userInfo',userInfoSchema);