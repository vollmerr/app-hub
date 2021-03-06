import React from 'react';
import { shallow } from 'enzyme';

import { testStyledComponent } from '../../../../utils/testUtils';

import { ACK } from '../../constants';

import Details, { Wrapper, Heading, Item, Key, Value, items } from '../Details';


testStyledComponent(Wrapper);
testStyledComponent(Heading);
testStyledComponent(Item);
testStyledComponent(Key);
testStyledComponent(Value);


const props = {
  item: {
    [ACK.TITLE]: 'Test Title',
  },
};
items.forEach((x) => { props.item[x] = `Test ${x}`; });


describe('Details', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Details {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a heading with the items title', () => {
    expect(wrapper.find(Heading).length).toEqual(1);
    expect(wrapper.find(Heading).dive().text()).toEqual(props.item[ACK.TITLE]);
  });

  it('should render all the items with a key and value for each', () => {
    expect(wrapper.find(Item).length).toEqual(items.length);
    expect(wrapper.find(Key).length).toEqual(items.length);
    expect(wrapper.find(Value).length).toEqual(items.length);
  });
});
