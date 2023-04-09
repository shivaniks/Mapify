const express = require('express')
const cors = require('cors')
const dotenv=require('dotenv')
const app= express()
dotenv.config
const mongoose = require('mongoose')
const revRoute=require("./routes/reviews")
const userRoute=require("./routes/users")


app.use(cors({
    origin:"*"
}))
app.use(express.json())
mongoose.set('strictQuery', false)
mongoose
    .connect("mongodb+srv://sanchali:sanchali@map-user.eloibvw.mongodb.net/MapData?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        console.log("db connected")})
    .catch((err)=>console.log(err))
app.use("/users",userRoute)
app.use("/reviews",revRoute)
app.listen(8800,()=>{
    console.log("server running")
})