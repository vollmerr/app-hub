import React from 'react';
import { shallow } from 'enzyme';

import Router from 'components/Router';
import AppContent from 'components/App-Content';

import App from '../index';
import Spa from '../Spa';
import routes from '../routes';

process.env.API = {
  BARS: 'test url',
};


describe('Spa Entry', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the Spa container', () => {
    expect(wrapper.find(Spa).length).toEqual(1);
  });

  it('should render the AppContent container (for content of the app)', () => {
    expect(wrapper.find(AppContent).length).toEqual(1);
  });

  it('should render the Router with the AppContent container (for content of the app)', () => {
    expect(wrapper.find(Router).length).toEqual(1);
    expect(wrapper.find(AppContent).find(Router).length).toEqual(1);
  });

  it('should pass the routes to the Router', () => {
    expect(wrapper.find(Router).prop('routes')).toEqual(routes);
  });
});
