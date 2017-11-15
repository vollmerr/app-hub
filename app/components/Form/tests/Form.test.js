import React from 'react';
import { shallow } from 'enzyme';
import { testStyledComponent } from 'utils/testUtils';
import 'jest-styled-components';

import Form from '../Form';


testStyledComponent(Form);


describe('<Form />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Form />);
  });

  it('should render correctly with vh and margin passed', () => {
    wrapper.setProps({ vh: 100, margin: '15px' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with nothing passed', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
