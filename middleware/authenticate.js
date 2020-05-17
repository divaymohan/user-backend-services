function authenticate(req,res,next){
    console.log('authhenticating..!!');
    next();
}

module.exports = authenticate;