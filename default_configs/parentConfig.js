
module.exports=function(){
    try{
        console.log("prePopulation called");
        prePopulateStatusFields();
    }
    catch(err){
        console.log("Error occured at defaultConfig ->",err);
    }
}

const prePopulateStatusFields=function(){
    let defaultStatuses=[
        {"name":"Open"},
        {"name":"Closed"},
        {"name":"Onhold"}
    ];
    let status=require('../schemas/status');
    if(status.length<1){
        status.insertMany(defaultStatuses);
    }
}