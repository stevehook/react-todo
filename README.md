#react-todo

A simple react front-end to a (separate) TODO API

##Development environment

The infrastructure for this client application is deliberately
lightweight. We are just using npm and Browserify to run the development
environment.

Browserify will pre-process all the JS into a `bundle.js` file. To kick
off a watcher that re-generates this file when needed:

    $ npm start

To run a local server, based on `http-server`, that just serves the
static assets that make up the front-end:

    $ npm run serve

The server proxies unknown requests to the API server at localhost:9292.

##Test

    $ npm test

Run eslint:

    $ npm run lint
