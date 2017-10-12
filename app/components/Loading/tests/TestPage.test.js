import React from 'react';
import { shallow } from 'enzyme';

import TestPage from '../TestPage';


describe('<TestPage />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TestPage />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
