import React from 'react';
import { shallow } from 'enzyme';

import Alerts from '../Alerts';


describe('<Alerts />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Alerts />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a h2 header', () => {
    expect(wrapper.find('h2').length).toEqual(1);
  });

  xit('should render all the alerts', () => {
    // expect(wrapper.find(AlertsItem?).length).toEqual(alerts.length?);
  });
});
