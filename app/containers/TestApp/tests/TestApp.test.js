import React from 'react';
import { shallow } from 'enzyme';

import { testMapDispatchToProps } from 'utils/testUtils';
import AppContainer from 'containers/App-Container';

import { TestApp, mapDispatchToProps } from '../TestApp';
import { initDataRequest } from '../actions';

const props = {
  meta: { desc: 'test desc' },
  routes: [{ name: 'route1', key: 'testHome', path: '/testpath' }, { name: 'route2', key: '2', path: '/testpath2' }],
  onInitRequest: jest.fn(),
};


describe('<TestApp />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<TestApp {...props} />);
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
