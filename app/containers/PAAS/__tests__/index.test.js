import React from 'react';
import { shallow } from 'enzyme';

import App from '../../App';

import { PAAS } from '../index';


const props = {
  appProps: {
    name: 'test name',
    meta: { desc: 'test desc' },
    routes: [{ name: 'route1', key: 'testHome', path: '/testpath' }, { name: 'route2', key: '2', path: '/testpath2' }],
  },
};


describe('<PAAS />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PAAS {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have render a `App`', () => {
    expect(wrapper.find(App).length).toEqual(1);
  });
});
