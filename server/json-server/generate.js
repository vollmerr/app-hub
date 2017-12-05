/* eslint-disable */
const path = require('path');

const spa = require('./api/spa'); // TODO: multiple schemas merged into one (NAMESPACING...)
const fs = require('fs');

const json = JSON.stringify(spa);

fs.writeFile(path.join(__dirname, 'db.json'), json, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Mock data generated for spa.');
});


const users = JSON.stringify({
  spa: spa.spaRecipients.map(x => x.token),
});

fs.writeFile(path.join(__dirname, '../../internals/mocks/jwt.json'), users, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Mock jwts generated for spa.');
});
