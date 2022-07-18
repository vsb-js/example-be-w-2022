import express from "express";
import cors from "cors";
import config from "../config.js";

import headersMiddleware from "./middlewares/headersMiddleware.js";
import infoMiddleware from "./middlewares/infoMiddleware.js";

import routes from "./routes/routes.js";

const app = express();

// Parse JSON body for each request
app.use(express.json());

// Hide server name for security reason
app.disable("x-powered-by");

/*
  Add CORS headers.
  Learn more on: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
*/
app.use(cors(config.cors));

/*
  Catch preflight requests before precessing by router
  Learn more on: https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
 */
app.options("*", cors(config.cors));

// Change default JSON serialization of Date to UNIX timestamp epoch time
app.set("json replacer", function (key, value) {
  if (this[key] instanceof Date) {
    // Your own date serialization
    value = parseInt((this[key].getTime() / 1000).toFixed(0));
  }
  return value;
});

// Separate response body for middlewares: Prevent default json() function immediately execution
app.use((req, res, next) => {
  const jsonFunc = res.json;
  res.body = {};
  res.execBeforeSend = [];
  res.json = (body) => {
    res.json = jsonFunc;
    res.execBeforeSend.forEach((func) => func());
    return res.json({
      // Add success field based on status code if it's not presented
      success: res.statusCode >= 200 && res.statusCode <= 299,
      ...body,
    });
  };
  next();
});

// Server middlewares: The order of the middlewares matters
app.use(headersMiddleware);
app.use(infoMiddleware);

// Server routes
app.use(routes);

// Handle errors
app.use((error, req, res, next) => {
  console.error(`[error] ${error}`);
  res.status(500).json({
    error: "Internal Server Error",
    message: "An internal problem has occurred",
  });
  next();
});

// Start express server
app.listen(config.port, config.host, () => {
  console.info(
    `[info] ${process.env.npm_package_name} ${process.env.npm_package_version} is listening on port ${config.port}`,
  );
  console.info(`[info] Running in the ${process.env.NODE_ENV} mode`);
});

export default app;
