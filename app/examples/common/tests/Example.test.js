

import React from 'react';
import { shallow } from 'enzyme';

import Example from '../Example';

const header = 'test header';
const desc = ['test desc 1', 'test desc 2'];
const Children = () => <div>test children</div>;

const wrapper = shallow(
  <Example header={header} desc={desc}>
    <Children />
  </Example>
);


describe('<Example />', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render its children', () => {
    expect(wrapper.find(Children).length).toEqual(1);
  });

  it('should render a header', () => {
    expect(wrapper.find('h1').length).toEqual(1);
  });

  it('should render a description', () => {
    expect(wrapper.find('p').length).toEqual(desc.length);
  });
});
