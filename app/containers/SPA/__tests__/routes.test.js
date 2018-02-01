import routes from '../routes';


describe('routes', () => {
  it('should be in the correct format', () => {
    expect(routes).toMatchSnapshot();
  });

  it('should `Home` on the first routes key', () => {
    expect(routes.length).toBeGreaterThan(0);
    expect(routes[0].key).toContain('Home');
  });
});
