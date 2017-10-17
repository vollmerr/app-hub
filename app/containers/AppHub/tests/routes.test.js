import routes, { apps } from '../routes';

describe('routes', () => {
  it('should be in the correct format', () => {
    expect(routes).toMatchSnapshot();
    expect(apps).toMatchSnapshot();
  });
});
