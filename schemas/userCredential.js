const mongoose=require('mongoose');
const schema=mongoose.Schema;
const passportLocalStratergy=require('passport-local-mongoose');
require('mongoose-type-email');


const userCredentialSchema=new schema({
    username:{
        type:String,
        unique:true
    }, 
    email:{
        type:mongoose.SchemaTypes.Email,
        unique:true,
        required:true
    }
},{timestamps:true});

userCredentialSchema.plugin(passportLocalStratergy);

module.exports=mongoose.model('userCredential',userCredentialSchema);
