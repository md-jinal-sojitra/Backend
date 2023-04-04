require('dotenv').config()
const express = require('express')// importing express
const app=express.app();
const mongoose=require('mongoose')

const db_url=process.env.DB_URL

// const port=process.env.PORT
// // const db_url=process.env.DB_URL
// const app=express()//intializing express app 

mongoose.connect(db_url)
.then(()=>console.log("Connection Successful"))
.catch((err)=>console.log(err)) 

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    body:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        trim: true
    },
    likes:{
        type:Number,
        default:0

    },
    tags:{
        type:Array,
        default:[]
    },
    date:{
        type:Date,
        default:Date.now
    }
},{
   timestamps:true 
})

const Post=new mongoose.model('Post',postSchema)

const createDocument=async()=>{
    try{
        const firstPost=new Post({
            title:"Post Title 1",
            body:"Body of post",
            category:"News",
            likes:1,
            tags:[
                "news",
                "events"
            ]
        })

        const secondPost=new Post({
            title:"Post Title 2",
            body:"Body of post",
            category:"Technology",
            likes:1,
            tags:[
                "news",
                "events"
            ]
        })

        const thirdPost=new Post({
            title:"Post Title 3",
            body:"Body of post",
            category:"News",
            likes:1,
            tags:[
                "news",
                "events"
            ]
        })
        
        const result= await Post.insertMany([firstPost,secondPost,thirdPost]);
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}

createDocument();

const getDocument=async () =>{
    try{
        const result=await Post.find({category:'Technology'}).select({title:1}).limit(1);
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
    
}

getDocument();

const updateDocument=async(_id)=>{
    try{
       // const result=await Post.updateOne({_id},{
            
        const result=await Post.findByIdAndUpdate({_id},{
            $set:{
                category:"Knowledge"
            }
        },{new:true});

        console.log(result);

    }catch(err){
        console.log(err);
    }
}

updateDocument('641d549f65d67f63b6c35260');

const deleteDocument=async(_id)=>{
try{
    //findByIdAndDelete
const result=await Post.deleteOne({_id});//filters need in curly bracket in mongoose
console.log(result);
}
catch(err){
    console.log(err);
}
}

deleteDocument('641d549f65d67f63b6c35262');

//Restful API
app.post('/posts',(req,res)=>{
   res.send('hello from post method')  
})

app.get("/",(req,res)=>{res.send("Welcome To Home Page")

})

app.get("/about",(req,res)=>{res.status(200).send("Welcome To about Page")

})

app.get("/contactus",(req,res)=>{res.send("Welcome To Contact Us Page")

})
