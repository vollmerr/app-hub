import React from 'react';
import { shallow } from 'enzyme';

import ComponentToLoad from '../ComponentToLoad';

describe('<ComponentToLoad />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ComponentToLoad />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should display some content', () => {
    expect(wrapper.children().length).toEqual(1);
  });
});
