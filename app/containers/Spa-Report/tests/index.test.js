import React from 'react';
import { shallow } from 'enzyme';

import SpaReport from '../index';

describe('<SpaReport />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<SpaReport />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
