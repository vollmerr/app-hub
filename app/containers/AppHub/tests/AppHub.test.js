import React from 'react';
import { shallow } from 'enzyme';

import { testMapDispatchToProps } from 'utils/testUtils';

// import AppHubHeader from 'components/AppHub-Header';
// import AppHubPanel from 'components/AppHub-Panel';
import { AppHub, mapDispatchToProps } from '../AppHub';
import { changeMobile, changePanelOpen, changePanelSelected, authUserRequest } from '../actions';

const props = {
  onChangePanelOpen: jest.fn(),
  onChangePanelSelected: jest.fn(),
  onChangeMobile: jest.fn(),
  onAuthUserRequest: jest.fn(),
  isMobile: false,
  panelIsOpen: false,
  panelSelected: 'test panel',
  userName: 'test name',
  appMeta: { desc: 'test desc' },
  appRoutes: [{ name: 'approute1', key: 'testHome', path: '/testpath' }, { name: 'approute2', key: '2', path: '/testpath2' }],
  routes: [{ name: 'route1', key: 'testHome', path: '/testpath' }, { name: 'route2', key: '2', path: '/testpath2' }],
};


describe('<AppHub />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<AppHub {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // it('should have tests for AppHubHeader and AppHubPanel', () => {
  //   expect(1).toEqual(0);
  // });

  // describe('componentDidMount', () => {
  //   expect(1).toEqual(0);
  // });

  // describe('componentWillUnmount', () => {
  //   expect(1).toEqual(0);
  // });

  // describe('handleResize', () => {
  //   expect(1).toEqual(0);
  // });

  // describe('handlePanelClick', () => {
  //   expect(1).toEqual(0);
  // });

  describe('mapDispatchToProps', () => {
    const actions = [
      changeMobile,
      changePanelOpen,
      changePanelSelected,
      authUserRequest,
    ];

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
