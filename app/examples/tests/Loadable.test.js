import React from 'react';
import { shallow } from 'enzyme';

import Loadable from '../Loadable';


describe('<Loadable />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Loadable />);
  });

  it('should render correctly', () => {
    const instance = wrapper.instance();
    expect(instance).toMatchSnapshot();
  });
});
