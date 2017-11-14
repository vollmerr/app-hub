# app-hub

[![codecov](https://codecov.io/gh/vollmerr/app-hub/branch/master/graph/badge.svg)](https://codecov.io/gh/vollmerr/app-hub)
[![Build Status](https://travis-ci.org/vollmerr/app-hub.svg?branch=master)](https://travis-ci.org/vollmerr/app-hub)
[![dependencies Status](https://david-dm.org/vollmerr/app-hub/status.svg)](https://david-dm.org/vollmerr/app-hub)
[![devDependencies Status](https://david-dm.org/vollmerr/app-hub/dev-status.svg)](https://david-dm.org/vollmerr/app-hub?type=dev)

## Getting Started

1. Clone the repo
```
https://github.com/vollmerr/app-hub.git
```

2. Install the packages
```
cd app-hub
npm install
```

3. Start the project
(dev mode)
```
npm start
```
(dev mode with tests running on changed files)
```
npm run start:watch
```
(prod mode)
```
npm run start:production
```

4. Test the project
(all files single time with coverage)
```
npm test
```
(only changed files)
```
npm run test:watch
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
