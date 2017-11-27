import React from 'react';
import { shallow } from 'enzyme';
import { testStyledComponent } from 'utils/testUtils';
import 'jest-styled-components';

import Section from 'components/App-Content/Section';

import ListSection from '../ListSection';


testStyledComponent(ListSection, Section);

const props = {
  vh: 100,
  margin: 20,
};


describe('<Items />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ListSection {...props} />);
  });

  it('should render correctly with vh and margin passed', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with nothing passed', () => {
    wrapper.setProps({ vh: undefined, margin: undefined });
    expect(wrapper).toMatchSnapshot();
  });
});
