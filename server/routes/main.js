const express = require('express');
const router = express.Router();
const Blog = require("../models/Blog");
const Faq = require("../models/Faq");

//Routes
router.get('', (req,res)=>{
    const locals = {
        title: "NodeJs Blog",
        description: "Simple blog created with NodeJS, MongoDB and Express"
    } // sending locals. as data to dynamically load into the layout 
    res.render("index", { locals });
})

router.get('/blag', async (req,res)=>{
    try {

        // sending locals. as data to dynamically load into the layout 
        const locals = {
            title: "blag"
        }
        const data = await Blog.find();
        res.render("blag", { locals, data });
    } catch (error) {
        console.log(error);
    }
});
router.get('/blog/:id', async (req,res)=>{
    try {
        let slug = req.params.id;
        const data = await Blog.findById({ _id: slug}).sort({ createdAt: -1 });
        // sending locals. as data to dynamically load into the layout 

        const locals = {
            title: data.title ,
            //description: "Simple blog created with NodeJS, MongoDB and Express" MAYBE INCORPORATE INTO DATABASE
        }
        res.render("blog", { locals, data });
    } catch (error) {
        console.log(error);
    }
});

router.get('/comics', (req,res)=>{
    res.render("comics");
});

router.get('/projects', (req,res)=>{
    res.render("projects");
});

router.get('/faq', async (req,res)=>{
    try {

        // sending locals. as data to dynamically load into the layout 
        const locals = {
            title: "faq"
        }
        const data = await Faq.find();
        res.render("faq", { locals, data });
    } catch (error) {
        console.log(error);
    }
});

//get POST: searchterm
router.post('/search', async (req,res)=>{
    try {
        const locals = {
            title: "Search",
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")
        const data = await Blog.find({
            $or: [
              { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
              { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
            ]
          });

        //res.render("search", { locals, data });
        res.render("search", {
            data,
            locals,
          });
    } catch (error) {
        console.log("Error");
    }
});




module.exports = router;



// function insertFaqData (){
//     Faq.insertMany([
//         {
//             title: "Why is this website so ugly?",
//             body: "I ask myself that everytime I look at it. That's why I am including this on the FAQ before someone else points it out first."

//         },
//     ])
// }
// insertFaqData();