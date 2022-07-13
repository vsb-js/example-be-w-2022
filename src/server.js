const express = require('express')
const pkg = require('../package.json')

const app = express()
const config = require('../config.json');

// Separate response body for middlewares: Prevent default json() action
app.use((req, res, next) => {
    const jsonFunc = res.json;
    res.body = {}
    res.json = (body) => {
        res.json = jsonFunc;
        return res.json({
            success : res.statusCode === 200,
            ...body
        });
    };
    next();
});

// Server's middlewares
require('./securityMiddleware.js')(app, config);
require('./infoMiddleware.js')(app);

// Server's routes
require('./routes.js')(app);

app.listen(config.port, config.host, () => {
    console.info(`[info] ${pkg.name} ${pkg.version} is listening on port ${config.port}`)
})
