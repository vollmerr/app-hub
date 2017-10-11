// see https://github.com/facebook/jest/issues/4545
// Must be before test-bundler file to ignore errors that get thrown from missing requestAnimationFrame
global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};
