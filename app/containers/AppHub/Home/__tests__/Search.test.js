import React from 'react';
import { shallow } from 'enzyme';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

import { testStyledComponent } from '../../../../utils/testUtils';

import Search, { Wrapper } from '../Search';


testStyledComponent(Wrapper);


const props = {
  onChange: jest.fn(),
};


describe('<Search />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Search {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a search box', () => {
    expect(wrapper.find(SearchBox).length).toEqual(1);
  });
});
