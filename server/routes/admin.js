const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog.js');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const adminLayout = '../views/layouts/admin';

const authMiddleware = (req, res, next ) => {
    const token = req.cookies.token;
  
    if(!token) {
      return res.status(401).json( { message: 'Unauthorized'} );
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.userId = decoded.userId;
      next();
    } catch(error) {
      res.status(401).json( { message: 'Unauthorized'} );
    }
  }
  


//GET HOME
//Admin login page

router.get('/admin', async (req,res)=>{
    try {
        const locals = {
            title: "Admin",
        }
        res.render("admin/index", { locals, layout : adminLayout});
    } catch (error) {
        console.log("Error");
    }
});

//POST 

router.post('/admin', async (req,res)=>{
    try {
        const {username, password} = req.body;

        const user = await User.findOne( {username} );

        if(!user){
            //return res.status(401).json( { message: 'Invalid Credentials'} );
            res.redirect('/admin');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            //return res.status(401).json( { message: 'Invalid Credentials'} );
            res.redirect('admin');
        }

        const token = jwt.sign({userId: user._id}, jwtSecret);
        res.cookie('token', token,  {httpOnly : true} );

        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
    }
});

router.get('/dashboard', authMiddleware, async (req,res)=>{
    try {
        const locals = {
            title: 'Dashboard',
            description: 'Welcome, Master'
        }


        const data = await Blog.find()
        res.render('admin/dashboard', {locals, data, layout : adminLayout});
    } catch (error) {
        
    }
});

// GET :CREATE NEW BLOG
//
//
router.get('/add-blog', authMiddleware, async (req, res) => {
    try {
      const locals = {
        title: 'Add Blog',
      }
  
      const data = await Blog.find();
      res.render('admin/add-blog', {
        locals,
        layout: adminLayout
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });

router.post('/add-blog', authMiddleware, async (req, res) => {
    try {
      try {
        const newBlog = new Blog({
          title: req.body.title,
          body: req.body.body
        });
  
        await Blog.create(newBlog);
        res.redirect('/dashboard');
      } catch (error) {
        console.log(error);
      }
  
    } catch (error) {
      console.log(error);
    }
  });

router.get('/edit-blog/:id', authMiddleware, async (req, res) => {
    try {
  
      const locals = {
        title: "Edit Blog",
      };
  
      const data = await Blog.findOne({ _id: req.params.id });
  
      res.render('admin/edit-blog', {
        locals,
        data,
        layout: adminLayout
      })
  
    } catch (error) {
      console.log(error);
    }
  
  });

router.put('/edit-blog/:id', authMiddleware, async (req, res) => {
    try {
  
      await Blog.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now()
      });
  
      res.redirect(`/edit-blog/${req.params.id}`);
  
    } catch (error) {
      console.log(error);
    }
  
  });


router.delete('/delete-blog/:id', authMiddleware, async (req, res) => {

    try {
      await Blog.deleteOne( { _id: req.params.id } );
      res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
    }
  
  });


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    //res.json({ message: 'Logout successful.'});
    res.redirect('/');
  });
  




module.exports = router;