import React from 'react';
import { shallow } from 'enzyme';

import { testStyledComponent } from 'utils/testUtils';

import Item from '../Item';
import Help, { Items, links } from '../Help';


testStyledComponent(Items);


describe('<Help />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Help />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a h2 header', () => {
    expect(wrapper.find('h2').length).toEqual(1);
  });

  it('should render all the links', () => {
    expect(wrapper.find(Item).length).toEqual(links.length);
  });
});
