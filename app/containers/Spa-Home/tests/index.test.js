import React from 'react';
import { shallow } from 'enzyme';

import { SpaHome } from '../index';

const props = {
  app: {
    error: null,
    loading: false,
  },
};

describe('<SpaHome />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<SpaHome {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
