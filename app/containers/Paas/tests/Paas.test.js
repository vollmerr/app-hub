import React from 'react';
import { shallow } from 'enzyme';

import AppContainer from 'containers/App-Container';

import { Paas } from '../Paas';

const props = {
  name: 'test name',
  meta: { desc: 'test desc' },
  routes: [{ name: 'route1', key: 'testHome', path: '/testpath' }, { name: 'route2', key: '2', path: '/testpath2' }],
};


describe('<Paas />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<Paas {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have render a AppContainer', () => {
    expect(wrapper.find(AppContainer).length).toEqual(1);
  });
});
