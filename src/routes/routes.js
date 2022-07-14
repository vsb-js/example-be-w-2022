const express = require('express')
const router = express.Router()
const endpointsService = require("../services/endpointsService.js");

// Homepage with list of endpoints
router.get('/', async (req, res) => {
    res.status(200).json({
        ...res.body,
        // List of available endpoints - For development purposes
        endpoints : endpointsService.getAll(router)
    })
})

// Comment endpoints
// Get post comments
router.get('/v1/posts/{:postId}/comments', async (req, res) => {
    res.status(200).json({})
})
// Create post comment
router.post('/v1/posts/{:postId}/comments', async (req, res) => {
    res.status(200).json({})
})
// Get post comment
router.get('/v1/posts/{:postId}/comments/{:commentId}', async (req, res) => {
    res.status(200).json({})
})
// Modify post comment
router.put('/v1/posts/{:postId}/comments/{:commentId}', async (req, res) => {
    res.status(200).json({})
})
// Delete post comment
router.delete('/v1/posts/{:postId}/comments/{:commentId}', async (req, res) => {
    res.status(200).json({})
})


// Post endpoints
// Get posts
router.get('/v1/posts', async (req, res) => {
    res.status(200).json({})
})
// Create post
router.post('/v1/posts', async (req, res) => {
    res.status(200).json({})
})
// Get post
router.get('/v1/posts/{:postId}', async (req, res) => {
    res.status(200).json({})
})
// Modify post
router.put('/v1/posts/{:postId}', async (req, res) => {
    res.status(200).json({})
})
// Delete post
router.delete('/v1/posts/{:postId}', async (req, res) => {
    res.status(200).json({})
})


// Endpoint was not found
router.get('*', async (req, res) => {
    res.status(404).json({
        error : "Not Found",
        message : "This endpoint was not found",
    })
})

module.exports = router