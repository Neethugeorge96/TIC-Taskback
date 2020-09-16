const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('../models/employee');


const db = "mongodb+srv://EMPLOYEE:user@cluster0.69pvs.mongodb.net/employeeDB?retryWrites=true&w=majority";

const secretKey = 'SECRET_KEY';

mongoose.connect(db, err=>{
    if(err){
        console.log("Error!" + err);
    }
    else{
        console.log("Connection SuccessFull!");
    }
})

router.post('/login', (req,res)=>{
    let employeeData = req.body;
    Employee.findOne({email : employeeData.email}, (error, user)=>{
        if(error){
            console.log("Error!"+ error);
        }
        else {
            if(!user){
                res.status(401).send("Invalid Email!");
            }else
                if(user.password !== employeeData.password){
                    res.status(401).send("Invalid Password!");
                }
            else{
                const responseData = {
                    status : 200,
                    message : "success",
                    data  : []
                }
                res.status(200).send(responseData);
            }
        }

    })
})

router.post('/emp_register',(req,res)=>{
    let employeeData = req.body;
    let employee = new Employee(employeeData);
    employee.save((error,registeredUser)=>{
        if(error){
            console.log("Error!" + error);
        }else{

            const responseData = {
                status: 200,
                message : 'success',
                data : "User Registered Successfully"
            }

            res.status(200).send(responseData);
        }
    })
})

router.get('/employees', (req, res)=>{
    Employee.find({}, (err, foundData)=>{
      if(err){
        console.log("Error! " + err);
        res.status(500).send("Couldn't read data from Database!");
      }
      else{
          const responseData =  {
              status : 200,
              message : 'Success',
              data : foundData
          }
          
          res.status(200).send(responseData);
        }
      })
    })

// function verifyToken(req, res, next){
//     if(!req.headers.authorization){
//       return res.status(401).send("Unauthorized Request!")
//     }
//     let token = req.headers.authorization.split(" ")[1]
//     if(token === "null"){
//       return res.status(401).send("Unauthorized Request!")
//     }
//     jwt.verify(token , secretKey, (err,decoded)=>{
//       if(err){
//         return res.status(401).send("Token Expired!")
//       }
//       else {
//         req.userId = decoded.subject
//         next()
//       }
//     })
    
//   }

//   router.get('/display', verifyToken , (req,res) => {
//     let special=[{
//         "_id": "1",
//         "name": "Auto Expo",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//       },
//       {
//         "_id": "2",
//         "name": "Auto Expo",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//       },
//       {
//         "_id": "3",
//         "name": "Auto Expo",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//       },
//       {
//         "_id": "4",
//         "name": "Auto Expo",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//       },
//       {
//         "_id": "5",
//         "name": "Auto Expo",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//       },
//       {
//         "_id": "6",
//         "name": "Auto Expo",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//       }
//     ];
//     res.json(special);
//   })


//to verify the token stored in client-side local storage with token stored in server side,
//we need to send the token from browser to server using HTTP_Interceptor.
//Http_Interceptor intercepts outgoing http request, transforms them and sends it to server. 

module.exports = router;