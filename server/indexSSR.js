const path = require('path');
const renderToString = require('react-dom/server').renderToString;
const Express = require('express');
const React = require('react');
// import { createStore } from 'redux';
const Provider = require('react-redux').Provider;
// const counterApp = require('./reducers');
const App = require('containers/AppHub');


const configureStore = require('../app/configureStore');

const app = Express();
const port = 3000;

//Serve static files
app.use('/static', Express.static('static'));

// This is fired every time the server side receives a request
app.use(handleRender);

function handleRender(req, res) {
  const initalState = {
    someting: 'sdas',
  };

  // Create a new Redux store instance
  const store = configureStore(initalState);

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Grab the initial state from our Redux store
  const finalState = store.getState();

  // Send the rendered page back to the client
  res.send(renderFullPage(html, finalState));
}

// The preloadedState will then be available on the client side by accessing window.__PRELOADED_STATE__
function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port);
