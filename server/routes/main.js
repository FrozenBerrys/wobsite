const express = require('express');
const router = express.Router();
const Blog = require("../models/Blog");

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
        const data = await Blog.findById({ _id: slug})
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

router.get('/faq', (req,res)=>{
    res.render("faq");
});




module.exports = router;



// function insertBlogData (){
//     Blog.insertMany([
//         {
//             title: "First Blag Post",
//             body: "Hi from VSCode editor - Boko"

//         },
//     ])
// }
// insertBlogData();