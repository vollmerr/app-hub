/* This script generates mock data for local development.
   This way you don't have to point to an actual API,
   but you can enjoy realistic, but randomized data,
   and rapid page loads due to local, static data.
 */

const jsf = require('json-schema-faker');
jsf.extend('faker', function() {
  return require('faker');
});

const schema = require('./db/spa/schema');
const fs = require('fs');

const json = JSON.stringify(jsf(schema));

fs.writeFile('./server/json-server/db/spa/db.json', json, function (err) {
  if (err) {
    return console.log(err);
  }

  console.log('Mock data generated for spa.');
});
