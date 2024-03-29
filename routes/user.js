//api request tools
const express = require('express');
const router = express.Router();
const Joi = require('joi');

//Database tools
const mongoose = require('mongoose');



const user = {
    "fisrtName": "fname",
    "lastName": "lname",
    "age": 24,
    "userName": "uname.lname",
    "password": "uname@123"
};
//schema
const schema = new mongoose.Schema({
    fisrtName:{
        type: String,
        minlength: 3,
        maxlength: 15
    },
    lastName: {
        type: String,
        minlength: 3,
        maxlength: 15
    },
    age: Number,
    userName: {
        type: String,
        minlength: 3,
        maxlength: 15
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 15
    }
});        

// model
const User = mongoose.model('User',schema);
//methods to get data from database  
async function getUsers(){
    //debugGet('Getting Data From Users...!!');
    
    return user;
}

async function getUserByid(id){
    //debugGet('Getting user by id..!!');
    
    return user;
}

async function saveUser(newuser){
      // debugPost('Saving data into database....!!!');
       
       return newuser; 
}
async function getUserByUserName(username){
   // debugGet('Getting user from database..!!');
    
    return user;
}
async function deleteUser(id){
    //debugDelete('Deleting user from database..!!');   
   
    return user;
}
async function updateById(id,nuname){
    
    if(!user){
        return;
    }
    return user;
}

function validate(user){
    const schema = {
        fisrtName: Joi.string().min(3).max(15).required(),
        lastName: Joi.string().min(3).max(15).required(),
        age: Joi.number().integer().min(15).max(100).required(),
        userName: Joi.string().alphanum().min(3).max(15).required(),
        password: Joi.string().alphanum().min(3).max(20).required()
    };
    const result = Joi.validate(user,schema);
    return result;
}
function validateUpdate(user){
    const schema = {
        fisrtName: Joi.string().min(3).max(15),
        lastName: Joi.string().min(3).max(15),
        age: Joi.number().integer().min(15).max(100),
        userName: Joi.string().alphanum().min(3).max(15),
        password: Joi.string().alphanum().min(3).max(20)
    };
    const result = Joi.validate(user,schema);
    return result;
}

//get all the users
router.get('/',async (req,res)=>{
    try{
        //const users = await getUsers();
        return res.send(user)

    }catch(err){
        return res.send(err.message);
    }
    
});

//get user by id

router.get('/id/:id/',async (req,res)=>{
    //check if user is available
    try{
        const usr = await getUserByid(req.params.id);
        if(!usr) return res.status(404).send(`No user found with id ${req.params.id}`);
        return res.send(usr);

    }catch(err){
        return res.send(err.message);
    }
    
});


//get user by name
router.get('/name/:username/',async (req,res)=>{
    //check if user is available
    try{
        const usr = await getUserByUserName(req.params.username);
        //return error message if not found
        if(usr === undefined) return res.status(404).send(`No user found with name ${req.params.username}`);
        //return usr if found
        return res.send(usr);
    }catch(err){
        res.send(err.message);
    }
    
 });

 //add a user
 router.post('/',async (req,res)=>{
    //validate the data
    const {error,value} = validate(req.body);
    //if not valid through a error
    if(error) return res.send(error.details[0].message);
    //if valid add user and return new added user
    //create new user
    const  newuser = new User({
        fisrtName: req.body.fisrtName,
        lastName: req.body.lastName,
        age: parseInt(req.body.age),
        userName: req.body.userName,
        password: req.body.password
    });
    //push new user into databse
    try{
        const result = await saveUser(newuser);
        return res.send(result);
    }
    catch(err){
        return res.send(err.message);
    }
  
    //return response
});

 //update a new user
 router.put('/:id',async (req,res)=>{
    const {error,value} = validateUpdate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const usr = new User({
        fisrtName: req.body.fisrtName,
        lastName: req.body.lastName,
        age: parseInt(req.body.age),
        password: req.body.password,
        userName: req.body.userName,
    });
    //else update user
    try{
        const result = await updateById(req.params.id,usr);
        if(!result) res.status(400).send(`User with given id is not exist.`);
        //send the updated user
        return res.send(result);
    }catch(err){
        return res.send(err.message);
    }
   

 });

 //delete request user
 router.delete('/:id',async (req,res)=>{
    //get user
    try{
        const result = await deleteUser(req.params.id);
        if(!result) res.status(400).send(`user with id: ${req.params.id} is not available in Database.`);
        res.send(result);
    }catch(err){
        res.send(err.message);
    }
    
 });


 module.exports = router;