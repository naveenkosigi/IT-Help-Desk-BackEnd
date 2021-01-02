const mongoose=require('mongoose');
const schema=mongoose.Schema;

const noteSchema=new schema({
    description:{
        type:String,
        unique:true,
        required:true,
        minlength:1
    },
    showToRequester:{
        type:Boolean,
        default:false
    }
});

module.exports=mongoose.model('note',noteSchema);