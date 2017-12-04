/* eslint-disable */
const path = require('path');
const jsf = require('json-schema-faker');
jsf.extend('faker', () => require('faker'));

const spa = require('./api/spa'); // TODO: multiple schemas merged into one (NAMESPACING...)
const fs = require('fs');

const json = JSON.stringify(spa);

fs.writeFile(path.join(__dirname, 'db.json'), json, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Mock data generated for spa.');
});
