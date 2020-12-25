
module.exports=function(){
    try{
        console.log("parentConfig called");
    }
    catch(err){
        console.log("Error occured at defaultConfig ->",err);
    }
}