import React from 'react';
import { shallow } from 'enzyme';
import { testStyledComponent } from 'utils/testUtils';
import 'jest-styled-components';

import StyledForm from '../StyledForm';


testStyledComponent(StyledForm);


describe('<StyledForm />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<StyledForm />);
  });

  it('should render correctly with vh and margin passed', () => {
    wrapper.setProps({ vh: 100, margin: '15px' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with nothing passed', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
