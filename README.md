# resource-route

Human-readable JSON route definitions for REST resource models.

## Installation

Install using [npm][0]:

```sh
npm install resource-route
```

## Usage

```javascript
var app = require('express')();
var route = require('resource-route')(app);
var User = require('./models/User');

route({
  '/users':      ['index', 'create', User],
  '/users/:id':  ['show', 'update', 'destroy', User]
});
```

With middleware:

```javascript
route(authenticate, express.bodyParser(), {
  '/users':      ['index', 'create', User],
  '/users/:id':  ['show', 'update', 'destroy', User]
});
```

Using a model factory:

```javascript
var route = require('resource-route')(app, function(name) {
  return require('./models/' + name);
});

route({
  '/users':      ['index', 'create', 'User'],
  '/users/:id':  ['show', 'update', 'destroy', 'User']
});
```

Using a middleware factory:

```javascript
var route = require('resource-route')(app,
  // model factory
  function(name) {
    return require('./models/' + name);
  },
  // middleware factory
  function(url, action, Model) {
    return [
      authenticate(Model),
      express.bodyParser()
    ];
  }
);

route({
  '/users':      ['index', 'create', 'User'],
  '/users/:id':  ['show', 'update', 'destroy', 'User']
});
```

## MIT Licensed

[npm][0]: https://npmjs.org/
