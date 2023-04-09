const router=require('express').Router()

const Review=require("../models/Review")
//create
router.post("/new",async(req,res)=>{
    const newRev=new Review(req.body)
    try{
        const savedRev=await newRev.save()
        console.log(savedRev)
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.status(200).json(savedRev)
    }catch(err){
        res.status(404).json(err)
        console.log(err)
    }
})
//get
router.get("/",async(req,res)=>{
    try{
        const Reviews = await Review.find()
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).json(Reviews)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports=router