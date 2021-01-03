
module.exports=function(){
    try{
        console.log("prePopulation called");
        require('../schemas/note');
        prePopulateStatusFields();
        prePopulatePriorityFields();
    }
    catch(err){
        console.log("Error occured at defaultConfig ->",err);
    }
}

const prePopulateStatusFields=async() => {
    let defaultStatuses=[
        {"name":"Open"},
        {"name":"Closed"},
        {"name":"Onhold"}
    ];
    let status=require('../schemas/status');
    let documents=await status.find({});
    if(documents.length==0){
        status.insertMany(defaultStatuses);
    }
}

const prePopulatePriorityFields=async() => {
    let defaultPriorities=[
        {"name":"Low"},
        {"name":"High"},
        {"name":"Medium"},
        {"name":"Very Low"},
        {"name":"Very High"}
    ];
    let priority=require('../schemas/priority');
    let documents=await priority.find({});
    if(documents.length==0){
        priority.insertMany(defaultPriorities);
    }
}