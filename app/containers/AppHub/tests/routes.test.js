import routes, { apps } from '../routes';

describe('routes', () => {
  it('should be in the correct format in development', () => {
    expect(routes).toMatchSnapshot();
    expect(apps).toMatchSnapshot();
  });
  // TODO: figure out how to test production snapshotting....
});
