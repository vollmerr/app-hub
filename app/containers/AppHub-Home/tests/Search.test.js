import React from 'react';
import { shallow } from 'enzyme';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

import { testStyledComponent } from 'utils/testUtils';

import Search, { Wrapper } from '../Search';

testStyledComponent(Wrapper);


describe('<Search />', () => {
  let wrapper;
  let onChange;
  beforeEach(() => {
    onChange = jest.fn();
    wrapper = shallow(<Search onChange={onChange} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a search box', () => {
    expect(wrapper.find(SearchBox).length).toEqual(1);
  });
});
