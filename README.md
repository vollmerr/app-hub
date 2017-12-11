# app-hub

[![codecov](https://codecov.io/gh/vollmerr/app-hub/branch/master/graph/badge.svg)](https://codecov.io/gh/vollmerr/app-hub)
[![Build Status](https://travis-ci.org/vollmerr/app-hub.svg?branch=master)](https://travis-ci.org/vollmerr/app-hub)
[![dependencies Status](https://david-dm.org/vollmerr/app-hub/status.svg)](https://david-dm.org/vollmerr/app-hub)
[![devDependencies Status](https://david-dm.org/vollmerr/app-hub/dev-status.svg)](https://david-dm.org/vollmerr/app-hub?type=dev)


## About
This project is a central hub for BPAS applications. It is uses [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate) as its foundation and [Office UI Fabric React](https://github.com/OfficeDev/office-ui-fabric-react) for core styling and components. 


## Getting Started
### Clone the repo
```
https://github.com/vollmerr/app-hub.git
```

### Install the packages
```
cd app-hub
npm install
```

### Build test data
```
npm run build:api
```
This will only ever have to be done once, unless changes are made to the mock api data format.
The mock API will be available at [http://localhost:3001](http://localhost:3001).

### Start the project in Dev mode
Start the mock API
```
npm run start:api
```
It will now be available at [http://localhost:3001](http://localhost:3001).
If it is the first time running the mock API, see [Building test data](#building-test-data).

In another terminal, start the application in dev mode
```
npm start
```
It will now be available at [http://localhost:3000](http://localhost:3000)

For testing different mock users, select a token from the 'Developer Options' panel in the top right.

### Build the Project
To build the project for production
```
npm run start:production
```
The propject will be built to the '/build' folder.


## Testing the project
To test all files a single time with coverage (cannot update snapshots using this)
```
npm test
```
To test only files that have changed
```
npm run test:watch
```
To test only files that have changed while running in dev mode
```
npm run start:watch
```


## Adding a New App
```
npm run generate app
```


## Examples
There are two forms of examples in this repo as follows:
### Demo App
- located in app/containers/Demo*
- ignored in tests/coverage, so no examples of those in there
- run in dev mode to view

### Specfic examples
- located in app/examples/*
- detailed comments throughout for explanations
- run `npm run start:examples` to start
