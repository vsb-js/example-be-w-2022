export default {
  /**
   * Returns array of available endpoints
   *
   * @param {Object} app express instance
   * @return {Array.<Object>} Array of available endpoints
   */
  getAll: (router) => {
    let routes = router.stack.filter((r) => r.route && r.route.path);
    return routes.map((r) => {
      const methods = Object.keys(r.route.methods);
      return {
        method: methods.length > 0 ? methods[0] : null,
        path: r.route.path,
      };
    });
  },
};
