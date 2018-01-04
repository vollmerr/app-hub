import React from 'react';
import { shallow } from 'enzyme';

import { testMapDispatchToProps } from 'utils/testUtils';
import AppContainer from 'containers/App-Container';

import { Paas, mapDispatchToProps } from '../Paas';
import { initDataRequest } from '../actions';

const props = {
  name: 'test name',
  meta: { desc: 'test desc' },
  routes: [{ name: 'route1', key: 'testHome', path: '/testpath' }, { name: 'route2', key: '2', path: '/testpath2' }],
  onInitDataRequest: jest.fn(),
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

  describe('mapDispatchToProps', () => {
    const actions = {
      initDataRequest,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
