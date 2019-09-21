const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all the posts
router.get('/', async (request, response) => {
    try{
        const posts = await Post.find();
        response.json(posts);
    } catch(err){
        response.status(501).json({message: err});
    }
});

// Insert a post
router.post('/', async (request, response) => {
    try {
        const post = new Post({
            title: request.body.title,
            description: request.body.description
        });
        
        const result = await post.save();
        response.json(result);
    } catch(err){
        response.status(501).json({message: err});
    }
});

// Find a specific post
router.get('/:id', async (request, response) => {
    try{
        const post = await Post.findById(request.params.id);
        response.json(post);
    }catch(err){
        response.status(501).json({message: err});
    }
});

// Delete a post
router.delete('/:id', async (request, response) => {
    try{
        const result = await Post.remove({
            _id: request.params.id
        });
        response.json(result);
    } catch(err){
        response.status(501).json({message: err});
    }
});

// Update a post
router.patch('/:id', async (request, response) => {
    try{
        const updatedPost = await Post.updateOne({ _id: request.params.id }, {
                                                        $set: {
                                                            title: request.body.title,
                                                            description: request.body.description
                                                        }
                                                    });
        response.json(updatedPost);
    } catch(err){
        response.status(501).json({message: err});
    }
});

module.exports = router;