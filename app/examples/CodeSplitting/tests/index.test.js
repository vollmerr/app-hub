import React from 'react';
import { shallow } from 'enzyme';

import CodeSplitting from '../index';

describe('<CodeSplitting />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CodeSplitting />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should display some content', () => {
    expect(wrapper.children().length).toEqual(1);
  });
});
