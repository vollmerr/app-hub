import React from 'react';
import { shallow } from 'enzyme';

import { testStyledComponent } from 'utils/testUtils';
import UserInfo, { Name, Initials } from '../UserInfo';


testStyledComponent(Name);
testStyledComponent(Initials);


const props = {
  name: 'test name',
  initials: 'TN',
};


describe('<UserInfo />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UserInfo {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the users name', () => {
    expect(wrapper.find(Name).length).toEqual(1);
    expect(wrapper.find(Name).contains(props.name)).toEqual(true);
  });

  it('should render the users initials', () => {
    expect(wrapper.find(Initials).length).toEqual(1);
    expect(wrapper.find(Initials).contains(props.initials)).toEqual(true);
  });
});
