import React from 'react';
import { shallow } from 'enzyme';

// import { testMapDispatchToProps } from 'utils/testUtils';

import AppContainer from 'containers/App-Container';
import { Spa } from '../Spa';

const props = {
  meta: { desc: 'test desc' },
  routes: [{ name: 'route1', key: 'testHome', path: '/testpath' }, { name: 'route2', key: '2', path: '/testpath2' }],
  dispatch: jest.fn(),
};


describe('<Spa />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<Spa {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have render a AppContainer', () => {
    expect(wrapper.find(AppContainer).length).toEqual(1);
  });
});
