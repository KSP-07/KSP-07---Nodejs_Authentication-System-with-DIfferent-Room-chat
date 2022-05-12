const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const express=require('express');
const router=express.Router();
var db=require('../db');
 
router.post('/register' , (req,res)=>{
    const name= req.body.name;
    const username= req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    const confirmPassword=req.body.confirmPassword;
    const referrerCode=req.body.referrer;

    db.query('SELECT email FROM sigup WHERE email=?',[email] , async(error,results) =>{
        if(error){
            console.log('error in query of email',error);
        }else{
            if(results.length >0 ){     //as results will form an array of used email
                console.log(results)
                return res.render('register',{message: 'This email is already in use !'})
                
            }else if(password!=confirmPassword){
                return res.render('register', {message: 'Password does not match !'})
            }
        }
        
        
        db.query('SELECT user_name from sigup WHERE user_name= ?', [username] , async(error,results) =>{
            if(error){
                console.log('error in user_name match' , error)
            }else if(results.length>0){
                return res.render('register',{message:'User Name already taken !'})
            }
            let hashedPass= await bcrypt.hash(password,10);
            console.log(hashedPass);
            
            const referral_id= username + Date.now().toString(8) + Math.random().toString(8).substring(2);
            console.log(referral_id);
            db.query("INSERT INTO sigup SET ?", {name:name , user_name:username, email:email , password:hashedPass , referral_code: referral_id} , (error,results) =>{
                if(error){
                    console.log('error in insertion of basic info' ,error);
                }else{
                    console.log(results);
                    return res.render('register',{message: 'User Registeration Successful ! \r\n Please Login'})
                    // res.render('login')
                }
            })
             
        })
    })
    // res.send('User registered')
})

router.post('/login',(req,res) =>{
    const username= req.body.username;
    const password=req.body.password;

    db.query('SELECT user_name from sigup WHERE user_name= ?' , [username] , async(error,results) =>{
        if(error){
            console.log('error in login username side',error)
        }else{
            if(results.length===0){
                console.log("here here...") 
                console.log(results)
                return res.render('login',{message:'User does not exist !'})
            }
        }
        db.query('SELECT password from sigup',async(error,rows) =>{
            if(error){
                console.log('error in login username side',error)
            }else{
                bcrypt.compare(password , rows[0].password ,(error,isMatch)=>{
                    if(error) console.log(error)
                    else if(!isMatch){
                        console.log(rows[0].password)
                        console.log(password)
                        return res.render('login',{message:"Invalid Password"})
                    }
                    res.render('chat-index')
                })
            }  
        })
    })
}) 


 
  

router.get('/chat', (error,res)=>{ 
    // if(error) console.log(error)  
    // else{ 
        // console.log('chats')
        res.render('chat')
    // }
}) 

// router.get('/chat-index', (error,res)=>{ 
//     // if(error) console.log(error)  
//     // else{ 
//         // console.log('chats')
//         res.render('chat-index')
//     // }
// }) 




module.exports=router;  