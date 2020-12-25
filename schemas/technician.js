const mongoose=require('mongoose');
const schema=mongoose.Schema;
require('mongoose-type-email');

const technicianSchema=new schema({
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
    permissions:[
        {
        type:schema.Types.ObjectId,
        ref:'permissions'
        }
    ]
},{timestamps:true});

module.exports=mongoose.model('technician',technicianSchema);
