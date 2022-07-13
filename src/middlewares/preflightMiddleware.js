module.exports = (app) => {
    // Detect preflight requests and then close the connection before processing to minimize server load
    // https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
    app.use((req, res, next) => {
        if(req.method === 'OPTIONS'){
            res.status(200).json(res.body);
            return;
        }
        next();
    });
}