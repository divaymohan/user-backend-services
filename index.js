const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

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
]


//get all the users