const express = require('express');
const pasth = require ("path");
const bcrypt = require ("bcrypt");
const collection = require("./config");

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/",(req, res)=>{

    res.render('welcome');
});

app.get("/login",(req, res)=>{

    res.render('login');
});

app.get("/register",(req, res)=>{

    res.render('register');
});

app.post("/register", async(req,res)=>{
    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }

    const existingUser = await collection.findOne({email: data.email});

    if(existingUser){
        res.send("User Already Exists. Please choose a different Email");

    }
    else{
         
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(data.password,saltRounds);
        data.password = hashPassword;
        const hashconfirmPassword = await bcrypt.hash(data.confirmPassword,saltRounds);
        data.confirmPassword = hashconfirmPassword;
const userdata = await collection.insertMany(data);
console.log(userdata);
    }
});


app.post("/login", async (req,res)=>{

    try{
        const check=await collection.findOne({email:req.body.email});
        if(!check){
             res.send("User not found.");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    if(isPasswordMatch){
        res.render("welcome");
    }else{
        req.send("Wrong Password");
    }
    }catch{
        res.send("wrong details");
    }


});

const port = 3000;
app.listen(port, () => {
    console.log('Server running on port: $(port)');


})