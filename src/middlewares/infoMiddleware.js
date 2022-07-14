const pkg = require('../../package.json')

module.exports = (req, res, next) => {
    res.body.name = pkg.name
    res.body.version = pkg.version
    next()
}