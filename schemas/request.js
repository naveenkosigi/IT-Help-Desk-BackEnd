const schema=require('mongoose').Schema;
const autoIncrement=require('mongoose-auto-increment');
const connection=require('mongoose').createConnection('mongodb://localhost/ithelpdesk');

autoIncrement.initialize(connection);


const requestSchema=new schema({
    subject:{
        type:String
    }
});

requestSchema.plugin(autoIncrement.plugin,{
    model:'request',
    field:'displayId',
    startAt:1,
    incrementBy:1
});

module.exports=connection.model('request',requestSchema);