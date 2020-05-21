//api request tools
const express = require('express');
const router = express.Router();
const Joi = require('joi');

//Database tools
const mongoose = require('mongoose');

//debugger tools import
const debugConnection = require('debug')('api:DBconnection');
const debugGet = require('debug')('api:Get');
const debugValidate = require('debug')('api:validate');
const debugPost = require('debug')('api:post');
const debugUpdate = require('debug')('api:put');
const debugDelete = require('debug')('api:delete');

//database connection
mongoose.connect('mongodb://localhost/user-app-database')
        .then(()=>debugConnection("Database Connected."))
        .catch(err=> debugConnection(`Error in Connecting: ${err.message}`));

//schema
const schema = new mongoose.Schema({
    fisrtName: String,
    lastName: String,
    age: Number,
    userName: String,
    password: String
});        

// model
const User = mongoose.model('User',schema);
//methods to get data from database  
async function getUsers(){
    debugGet('Getting Data From Users...!!');
    return await User.find();
}

async function getUserByid(id){
    debugGet('Getting user by id..!!');
    return await User.findById(id);
}

async function saveUser(newuser){
       debugPost('Saving data into database....!!!');
       return await newuser.save(); 
}


const users = [
    {id:1,fisrtName:"divay",lastName:"mohan",age: 24,userName:"dm.fire",password:"divmoh1305"},
    {id:2,fisrtName:"diksha",lastName:"rajput",age: 24,userName:"dx",password:"divmoh1305"},
    {id:3,fisrtName:"ayush",lastName:"sinha",age: 23,userName:"ayushsinha",password:"divmoh1305"},
    {id:4,fisrtName:"vikas",lastName:"kumar",age: 24,userName:"vikaskumar",password:"divmoh1305"},
    {id:5,fisrtName:"prateek",lastName:"kate",age: 22,userName:"prateekkate",password:"divmoh1305"},
    {id:6,fisrtName:"karun",lastName:"prataap",age: 21,userName:"karun",password:"divmoh1305"},
    {id:7,fisrtName:"vijeta",lastName:"prakash",age: 23,userName:"vizz",password:"divmoh1305"},
    {id:8,fisrtName:"akash",lastName:"kumar",age: 25,userName:"akashkumar",password:"divmoh1305"},
    {id:9,fisrtName:"aman",lastName:"chaudhary",age: 26,userName:"aman",password:"divmoh1305"},
    {id:10,fisrtName:"aniket",lastName:"chaudhary",age: 20,userName:"aniket",password:"divmoh1305"}
];

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

//get all the users
router.get('/',async (req,res)=>{
    try{
        const users = await getUsers();
        return res.send(users)

    }catch(err){
        return res.send(err.message);
    }
    
});

//get user by id

router.get('/id/:id/',(req,res)=>{
    //check if user is available
    const usr = users.find((u)=>{
        return u.id === parseInt(req.params.id);
    });
    //return error message if not found
    if(usr===undefined) return res.status(404).send(`No user found with id ${req.params.id}`);
     //return usr if found
    return res.send(usr);
});


//get user by name
router.get('/name/:username/',(req,res)=>{
    //check if user is available
    
    const usr = users.find((u)=>{
        return u.userName == req.params.username;
    });
    //return error message if not found
    if(usr === undefined) return res.status(404).send(`No user found with name ${req.params.username}`);
    //return usr if found
    return res.send(usr);
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
 router.put('/:id',(req,res)=>{
    //get user by id
    const usr = users.find((u)=>{
        return u.id === parseInt(req.params.id);
    });
    //if not user send error
    if(usr === undefined) return res.status(404).send(`User not found with id ${req.body.id}`);
    //validate
    const {error,value} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //else update user
    usr.fisrtName = req.body.fisrtName;
    usr.lastName = req.body.lastName;
    usr.age = parseInt(req.body.age);
    usr.password = req.body.password;
    usr.userName = req.body.userName;
    //send the updated user
    return res.send(usr);

 });

 //delete request user
 router.delete('/:id',(req,res)=>{
    //get user
    const usr = users.find((u)=>{
        return u.id === parseInt(req.params.id);
    });
    //if not user found through error
    if(!usr) return res.status(404).send(`No user found with id: ${req.params.id}`);
    //else delete user
    const index = users.indexOf(usr);
    users.splice(index,1);
    return res.send(usr);
 });


 module.exports = router;