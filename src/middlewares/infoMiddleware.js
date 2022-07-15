import packageJson from "../../package.json" assert { type: "json" };

// This middleware adds app name and version to each response
export default (req, res, next) => {
  res.body.name = packageJson.name;
  res.body.version = packageJson.version;
  next();
};
