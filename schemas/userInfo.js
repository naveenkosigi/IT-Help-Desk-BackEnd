const mongoose=require('mongoose');
const schema=mongoose.Schema;
require('mongoose-type-email');

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
    },
    email:{
        type:mongoose.SchemaTypes.Email,
        unique:true,
        required:true
    },
    permissions:{
        type:schema.Types.ObjectId,
        ref:'permissions'
    },
    isTechnician:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports=mongoose.model('userInfo',userInfoSchema);
