# app-hub

[![codecov](https://codecov.io/gh/vollmerr/app-hub/branch/master/graph/badge.svg)](https://codecov.io/gh/vollmerr/app-hub)
[![Build Status](https://travis-ci.org/vollmerr/app-hub.svg?branch=master)](https://travis-ci.org/vollmerr/app-hub)

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
