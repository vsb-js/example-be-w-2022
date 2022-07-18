import config from "../../config.js";

// This middleware adds custom headers from config.js file to each response
export default (req, res, next) => {
  // Set custom security headers from config.js
  Object.keys(config.headers).forEach((name) => {
    res.setHeader(name, config.headers[name]);
  });
  next();
};
