const mongoose=require('mongoose');
const schema=mongoose.Schema;
require('mongoose-type-email');

const requesterSchema=new schema({
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
    }
},{timestamps:true});

/*
requesterSchema.pre('validate',function(next){
    console.log("validate fired");
    next();
});
*/
module.exports=mongoose.model('requester',requesterSchema);
