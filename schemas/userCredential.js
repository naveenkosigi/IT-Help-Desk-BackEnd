const mongoose=require('mongoose');
const schema=mongoose.Schema;
const passportLocalStratergy=require('passport-local-mongoose');

const userCredentialSchema=new schema({
    username:{
        type:String,
        unique:true
    }
});

userCredentialSchema.plugin(passportLocalStratergy);

module.exports=mongoose.model('userCredential',userCredentialSchema);
