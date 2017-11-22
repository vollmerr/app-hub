const path = require('path');
const fs = require('fs');

const mockDirectory = path.resolve(__dirname, 'db');

const createDB = () => {
  const folders = fs.readdirSync(mockDirectory);
  const mocks = {};

  folders.forEach((folder) => {
    const folderPath = `${mockDirectory}/${folder}`;

    if (fs.lstatSync(folderPath).isDirectory()) {
      const files = fs.readdirSync(folderPath);

      files.forEach((file) => {
        if (file.indexOf('.json') > -1) {
          Object.assign(mocks, require(`${folderPath}/${file}`));
        }
      });
    }
  });

  return mocks;
};

module.exports = function () {
  return createDB();
};
