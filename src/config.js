const mongoose= require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/CodeCanvasUserAuth");

connect.then(()=>{
console.log("database connected");
})

.catch((error) => {
    console.log("Database connection error:", error);
});


const LogInSchema = new mongoose.Schema({

email: {
    type:String,
    required:true
},
password: {
    type:String,
    required:true
},
firstname: {
    type:String,
    required:true
},
lastname: {
    type:String,
    required:true
},
confirmPassword: {
    type:String,
    required:true
}
})



const collection = new mongoose.model("Collection1",LogInSchema)

module.exports=collection
