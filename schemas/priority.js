const mongoose=require('mongoose');
const schema=mongoose.Schema;

const prioritySchema=new schema({
    name:{
        type:String,
        unique:true,
        required:true
    }
},{timestamps:true});


module.exports=mongoose.model('priority',prioritySchema);