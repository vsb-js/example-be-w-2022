const config = require("../../config.json")

module.exports = (req, res, next) => {
    // Hide server name
    req.app.disable('x-powered-by')

    // Set custom security headers from config.json
    Object.keys(config.headers).forEach(name => {
        res.setHeader(name, config.headers[name])
    })

    // Check allowed domains from config.json. Set header to * for any origin.
    const reqOrigin = req.get("origin")
    const domain = getDomainFromOrigin(reqOrigin)
    if(config["allowed-origin-domains"].find(allowedDomain => allowedDomain === domain || allowedDomain === "*")){
        res.setHeader("access-control-allow-origin", reqOrigin ?? "*")
    }

    next()
}

/**
 * Removes protocol and port from origin and keeps domain name only
 *
 * @param {string} origin Request origin value
 * @return {string} Domain name
 */
const getDomainFromOrigin = (origin) => {
    if(origin == null) return ""
    let firstChar = origin.lastIndexOf("/") + 1
    let lastChar = origin.lastIndexOf(":")
    lastChar = lastChar > 0 ? lastChar : origin.length - firstChar
    return origin.substring(firstChar, lastChar)
}
