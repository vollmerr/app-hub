import React from 'react';
import { shallow } from 'enzyme';

import App from '../../App';

import { Spa } from '../index';


const props = {
  ackStatus: {
    lastFetched: '01/02/2003',
  },
  onGetAckStatusRequest: jest.fn(),
};


describe('<Spa />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Spa {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have render a `App`', () => {
    expect(wrapper.find(App).length).toEqual(1);
  });
});
