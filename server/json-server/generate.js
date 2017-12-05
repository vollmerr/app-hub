/* eslint-disable */
const path = require('path');
const fs = require('fs');

function mapRoute(api, name, key) {
  const routes = {};
  const route = `/${api}/${key}`;
  routes[route] = name;
  routes[`${route}/:id`] = `/${name}/:id`;
  return routes;
}

fs.readdir(path.join(__dirname, 'api'), (err, files) => {
  if (err) {
    return console.error(err);
  }

  console.log('Generating mock data');

  let jwts = {};
  const db = {};
  const routes = {};
  // for each api in ./api
  files.forEach((file, index) => {
    // get the api file
    const api = require(path.join(__dirname, `api/${file}`));
    // prepend the routes with the apps name (ex: spa-recipients)
    const keys = {};
    Object.keys(api.keys).forEach((key) => {
      const name = `${api.name}-${key}`;
      // add api route by name to db
      keys[name] = api.keys[key];
      // add route to routes
      Object.assign(routes, mapRoute(api.name, name, key));
    });
    // add any additional custom routes
    if (api.routes && api.routes.length) {
      api.routes.forEach((route) => {
        Object.assign(routes, route);
      });
    }
    // add to the database and jwts
    Object.assign(db, keys);
    jwts[api.name] = api.jwts;
    console.log(`Generated mock database and jwts for ${api.name}.`);
  });

  // create mock database file
  fs.writeFile(path.join(__dirname, '.db.json'), JSON.stringify(db), (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('Created mock database file.');
  });

  // create mock jwts file
  fs.writeFile(path.join(__dirname, '../../internals/mocks/.jwt.json'), JSON.stringify(jwts), (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('Created mock jwt file.');
  });

  // create mock routes file
  fs.writeFile(path.join(__dirname, '.routes.json'), JSON.stringify(routes), (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('Created mock routes file.');
  });
});
