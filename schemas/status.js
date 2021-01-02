const schema=require('mongoose').Schema;

const statusSchema=new schema({
    name:{
        type:String,
        unique:true
    },
    disabled:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports=require('mongoose').model('status',statusSchema);