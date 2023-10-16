require('dotenv').config();
const express = require('express');
const app=express();
const mongodb = require('./mongodb');
const cors = require('cors');


// routes
const userRouter=require('./route/user-route');
const blogRouter=require('./route/blog-route');

app.use(express.json());
app.use(cors());
// app.use("/",(req,res)=>{
//     res.send("Hello World")
// })

// creating API
app.use("/api/user",userRouter)
app.use("/api/blog", blogRouter);



const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await mongodb(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
