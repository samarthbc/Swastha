const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Blog = require('../models/Blog');

// A middleware used to parse the incoming post request into JSON
router.use(express.json());

router.post('/createblog',
    [
        body('title','Title must be minimum 5 characters long').isLength({ min:5 }),
        body('content','Content must be minimum 500 characters long').isLength({min:5}),
        body('author','Author name must be minimum 3 characters long').isLength({min:3})
    ]

    , async (req,res) => {

        // To check for entry value errors using express validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let success = false;
            return res.status(400).json({ errors: errors.array(), success });
        }

        let blog = await Blog.create({
            author: req.body.author,
            title: req.body.title,
            topic: req.body.topic,
            content: req.body.content
        })
        return res.json({success:true})
    }
)

router.get('/getblog/:id', async(req,res) => {
    const blogId = req.params.id;

    try{
        const blog = await Blog.findById(blogId);

        if(!blog){
            return res.status(404).json({error:"No blog with given id found", success:flase})
        }

        return res.json(blog);
    }
    catch(error){
        return res.status(500).json({error:"Internal Server error"})
    }
})

router.get('/getall', async(req,res) => {
    try{
        const allblog = await Blog.find();
        return res.json(allblog)
    } catch(error){
        return res.status(500).json({error:"Internal server error"})
    }
})

module.exports = router