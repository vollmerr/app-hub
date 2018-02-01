import React from 'react';
import { shallow } from 'enzyme';
import { testStyledComponent } from 'utils/testUtils';

import FormSection from '../FormSection';


testStyledComponent(FormSection);


describe('<FormSection />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FormSection />);
  });

  it('should render correctly with vh and margin passed', () => {
    wrapper.setProps({ count: 3, padding: 15 });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with nothing passed', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
