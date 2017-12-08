import React from 'react';
import { shallow } from 'enzyme';

import Report from '../Report';

describe('<Report />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<Report />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
