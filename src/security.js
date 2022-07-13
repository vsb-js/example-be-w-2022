module.exports = (app, config) => {

    app.use((req, res, next) => {
        // Hide server version
        app.disable('X-Powered-By');
        app.disable('Server');

        // Set security headers
        Object.keys(config.headers).forEach(name => {
            res.setHeader(name, config.headers[name])
        });

        // Check allowed origins from config.json. Set * for any origin.
        const reqOrigin = req.get('origin');

        if(config["allowed-origins"].find(origin => origin === reqOrigin || origin === "*")){
            res.setHeader("Access-Control-Allow-Origin", config.headers[name])
        }

        next();
    });
}
