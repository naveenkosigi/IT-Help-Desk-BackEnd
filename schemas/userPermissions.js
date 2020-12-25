const mongoose=require('mongoose');
const schema=mongoose.Schema;
const requester=require('./requester');

const permissionsSchema=new schema({
    module:{
        type:String,
        default:'Request'
    },
    submodule:{
        type:String,
        enum:['note','history','tagged_users','']
    },
    add:{
        type:Boolean,
        default:true
    },
    edit:{
        type:Boolean,
        default:true
    },
    delete:{
        type:Boolean,
        default:false
    },
    view:{
        type:Boolean,
        default:true
    },
    user:{
        type:schema.Types.ObjectId,
        ref:'requester',
    }
},{timestamps:true});

module.exports=mongoose.model('permissions',permissionsSchema);