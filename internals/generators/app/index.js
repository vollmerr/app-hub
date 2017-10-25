/**
 * App Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a new app to App Hub',

  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'An app / container with this name already exists' : true;
      }

      return 'The name is required';
    },
  }, {
    type: 'input',
    name: 'title',
    message: 'What is the title (meta data)?',
    validate: (value) => (/.+/).test(value) || 'The title is required',
  }, {
    type: 'input',
    name: 'desc',
    message: 'What is the description (meta data)?',
    validate: (value) => (/.+/).test(value) || 'The description is required',
  }, {
    type: 'input',
    name: 'keywords',
    message: 'What are some keywords (meta data)?',
    validate: (value) => (/.+/).test(value) || 'Keywords are required',
  }],

  actions: (data) => {
    data.home = `${data.name}-Home`; // eslint-disable-line

    const actions = [
      // index
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/index.js',
        templateFile: './app/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/tests/index.test.js',
        templateFile: './app/index.test.js.hbs',
        abortOnFail: true,
      },
      // App
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/{{properCase name}}.js',
        templateFile: './app/App.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/tests/{{properCase name}}.test.js',
        templateFile: './app/App.test.js.hbs',
        abortOnFail: true,
      },
      // routes
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/routes.js',
        templateFile: './app/routes.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/tests/routes.test.js',
        templateFile: './app/routes.test.js.hbs',
        abortOnFail: true,
      },
      // Loadable
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/Loadable.js',
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      },

      // constants
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/constants.js',
        templateFile: './app/constants.js.hbs',
        abortOnFail: true,
      },

      // actions
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/actions.js',
        templateFile: './app/actions.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/tests/actions.test.js',
        templateFile: './app/actions.test.js.hbs',
        abortOnFail: true,
      },
      // selectors
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/selectors.js',
        templateFile: './app/selectors.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/tests/selectors.test.js',
        templateFile: './app/selectors.test.js.hbs',
        abortOnFail: true,
      },
      // reducer
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/reducer.js',
        templateFile: './app/reducer.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/tests/reducer.test.js',
        templateFile: './app/reducer.test.js.hbs',
        abortOnFail: true,
      },
      // sagas
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/saga.js',
        templateFile: './app/saga.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/tests/saga.test.js',
        templateFile: './app/saga.test.js.hbs',
        abortOnFail: true,
      },
      // Home page
      {
        type: 'add',
        path: '../../app/containers/{{ home }}/index.js',
        templateFile: './app/Home.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/containers/{{ home }}/tests/index.test.js',
        templateFile: './app/Home.test.js.hbs',
        abortOnFail: true,
      },

      // update apphub routes
      {
        type: 'modify',
        pattern: /([^]*AppHub-Home';)([\r\n]*)([^]*\/\/ __APPS__)([\r\n]*)([^]*;)([\r\n]*)/m,
        path: '../../app/containers/AppHub/routes.js',
        templateFile: './app/appHubRoutes.js.hbs',
        abortOnFail: true,
      },
      // update apphub meta
      {
        type: 'modify',
        pattern: /([^]*\/\/ __APPS__)([\r\n]*)([^]*;)([\r\n]*)/m,
        path: '../../app/containers/AppHub/meta.js',
        templateFile: './app/appHubMeta.js.hbs',
        abortOnFail: true,
      },
      // update icon file
      {
        type: 'modify',
        pattern: /([^]*\/\/ __APPS__)([\r\n]*)([^]*;)([\r\n]*)/m,
        path: '../../app/utils/initializeIcons.js',
        templateFile: './app/icon.js.hbs',
        abortOnFail: true,
      },
    ];

    return actions;
  },
};
