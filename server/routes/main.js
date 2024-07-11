const express = require('express');
const router = express.Router();

//Routes
router.get('', (req,res)=>{
    const locals = {
        title: "NodeJs Blog",
        description: "Simple blog created with NodeJS, MongoDB and Express"
    } // sending locals. as data to dynamically load into the layout 
    res.render("index", { locals });
})


router.get('/blag', (req,res)=>{
    res.render("blag");
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