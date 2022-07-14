const express = require('express')

const db = require("../models/index")
const app = express()
const config = require('../config.json');
const packageJson = require('../package.json')

const securityMiddleware = require('./middlewares/securityMiddleware')
const preflightMiddleware = require('./middlewares/preflightMiddleware')
const infoMiddleware = require('./middlewares/infoMiddleware')

const routes = require('./routes/routes')

app.use(
    express.urlencoded({
        extended: true
    })
);

// Separate response body for middlewares: Prevent default json() function immediately execution
app.use((req, res, next) => {
    const jsonFunc = res.json;
    res.body = {}
    res.json = (body) => {
        res.json = jsonFunc
        return res.json({
            // Add success field based on status code if it's not presented
            success : res.statusCode === 200,
            ...body
        })
    }
    next()
});

// Server middlewares: The order of the middlewares matters
app.use(securityMiddleware)
app.use(preflightMiddleware)
app.use(infoMiddleware)

// Server routes
app.use(routes);

// Handle errors
app.use((err, req, res, next) => {
    console.error(`[error] ${error}`)
    res.status(500).json({
        error : "Internal Server Error",
        message : "An internal problem has occurred",
    })
    next()
})

// Start express server
app.listen(config.port, config.host, () => {
    console.info(`[info] ${packageJson.name} ${packageJson.version} is listening on port ${config.port}`)
})
