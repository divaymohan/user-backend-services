function log(req,res,next){
    console.log("loging...!!");
    next();
}

module.exports = log;