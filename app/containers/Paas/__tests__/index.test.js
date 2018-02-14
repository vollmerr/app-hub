import React from 'react';
import { shallow } from 'enzyme';

import App from '../../App';

import { Paas } from '../index';


const props = {
  appProps: {
    name: 'test name',
    meta: { desc: 'test desc' },
    routes: [{ name: 'route1', key: 'testHome', path: '/testpath' }, { name: 'route2', key: '2', path: '/testpath2' }],
  },
};


describe('<Paas />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Paas {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have render a `App`', () => {
    expect(wrapper.find(App).length).toEqual(1);
  });
});
