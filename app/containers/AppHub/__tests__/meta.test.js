import appHub, { meta } from '../meta';

describe('meta', () => {
  it('should be in the correct format', () => {
    expect(meta).toMatchSnapshot();
    expect(appHub).toMatchSnapshot();
  });
});
