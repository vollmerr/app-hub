import React from 'react';
import { shallow } from 'enzyme';
import { testStyledComponent } from 'utils/testUtils';
import 'jest-styled-components';

import Form from '../Form';


testStyledComponent(Form);

const props = {
  vh: 100,
  margin: 15,
};


describe('<Form />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Form {...props} />);
  });

  it('should render correctly with vh and margin passed', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with nothing passed', () => {
    wrapper.setProps({ vh: undefined, margin: undefined });
    expect(wrapper).toMatchSnapshot();
  });
});
