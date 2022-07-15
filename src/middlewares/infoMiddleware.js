// This middleware adds app name and version to each response
export default (req, res, next) => {
  res.body.name = process.env.npm_package_name;
  res.body.version = process.env.npm_package_version;
  next();
};
