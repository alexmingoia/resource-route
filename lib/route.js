/**
 * Create route function for given `app`.
 *
 * @param {Express|Koa.Application} app
 * @param {Function} modelFactory
 * @param {Function} middlewareFactory
 * @api public
 */

module.exports = function(app, modelFactory, middlewareFactory) {

  /**
   * Register given resource `routes`.
   *
   *     route(middleware, {
   *       '/users':      ['index', 'create', User],
   *       '/users/:id':  ['show', 'update', 'destroy', User]
   *     });
   *
   * @param {Function} middleware Middleware or array of middleware. Optional.
   * @param {Object} routes
   * @api public
   */

  return function(middleware, routes) {
    if (!routes) {
      routes = middleware;
      middleware = [];
    }

    if (arguments.length > 2) {
      middleware = Array.prototype.slice.call(arguments);
      routes = middleware.pop();
    }

    var actionToMethod = {
      'index'      : 'get',
      'show'       : 'get',
      'create'     : 'post',
      'update'     : 'put',
      'destroy'    : 'del',
      'link'       : 'put',
      'describe'   : 'options'
    };

    for (var path in routes) {
      var actions = routes[path];
      var Model = actions.pop();

      if (typeof Model == 'string' && modelFactory) {
        Model = modelFactory(Model);
      }

      for (var len = actions.length, i=0; i<len; i++) {
        var action = actions[i];
        var args = [path];

        if (middlewareFactory) {
          middleware = middlewareFactory(path, action, Model);
        }

        args.push.apply(args, middleware);
        args.push(Model.middleware[action]);

        app[actionToMethod[action]].apply(app, args);
      }
    }
  };
};
