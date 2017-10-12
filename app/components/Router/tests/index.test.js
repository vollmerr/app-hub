import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Route } from 'react-router-dom';

import Router from '../index';

/* eslint-disable */
const Route1 = (props) => <div>route 1</div>;
const Route2 = (props) => <div>route 2</div>;

const routes = [
  { key: '1', exact: true, path: '/test1', component: Route1 },
  { key: '2', exact: false, path: '/test2', component: Route2 },
];

describe('<Router />', () => {
  let wrapper;
  let withRouter;
  beforeEach(() => {
    withRouter = mount(<MemoryRouter><Router routes={routes} /></MemoryRouter>);
    wrapper = withRouter.find(Router);
  });

  it('should render some routes', () => {
    expect(wrapper.find(Route).exists()).toEqual(true);
  });

  it('should only render the component passed to the route', () => {
    expect(wrapper.find(Route).find(Route1).exists()).toEqual(true);
    expect(wrapper.find(Route).find(Route2).exists()).toEqual(false);

  });

  it('should redirect to the path of the first route', () => {
    expect(wrapper.find(Route).find(Route1).exists()).toEqual(true);
    expect(wrapper.find(Route).find(Route2).exists()).toEqual(false);
  });
});
