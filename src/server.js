const express = require('express')

const app = express()
const config = require('./config.json');

require('./security.js')(app, config);
require('./routes.js')(app);

app.listen(config.port, config.host, () => {
    console.log(`Example backend app is listening on port ${config.port}`)
})
