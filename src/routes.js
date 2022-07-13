module.exports = (app) => {

    // Homepage with list of endpoints
    app.get('/', (req, res) => {
        // List of available endpoints - For development purposes
        let routes = app._router.stack.filter(r => r.route && r.route.path);
        routes = routes.map(r => {
            const methods = Object.keys(r.route.methods)
            return {
                method : methods.length > 0 ? methods[0] : null,
                path : r.route.path
            }
        } )

        res.status(200).json({
            ...res.body,
            endpoints : routes
        });
    })

    // Comment endpoints
    // Get post comments
    app.get('/posts/{:postId}/comments', (req, res) => {
        res.status(200).json({});
    })
    // Create post comment
    app.post('/posts/{:postId}/comments', (req, res) => {
        res.status(200).json({});
    })
    // Get post comment
    app.get('/posts/{:postId}/comments/{:commentId}', (req, res) => {
        res.status(200).json({});
    })
    // Modify post comment
    app.put('/posts/{:postId}/comments/{:commentId}', (req, res) => {
        res.status(200).json({});
    })
    // Delete post comment
    app.delete('/posts/{:postId}/comments/{:commentId}', (req, res) => {
        res.status(200).json({});
    })


    // Post endpoints
    // Get posts
    app.get('/posts', (req, res) => {
        res.status(200).json({});
    })
    // Create post
    app.post('/posts', (req, res) => {
        res.status(200).json({});
    })
    // Get post
    app.get('/posts/{:postId}', (req, res) => {
        res.status(200).json({});
    })
    // Modify post
    app.put('/posts/{:postId}', (req, res) => {
        res.status(200).json({});
    })
    // Delete post
    app.delete('/posts/{:postId}', (req, res) => {
        res.status(200).json({});
    })


    // Endpoint was not found
    app.get('*', function(req, res){
        res.status(404).json({
            error : "Not Found",
            message : "This endpoint was not found",
        });
    });
}
