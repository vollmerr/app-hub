import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Route } from 'react-router-dom';

import Router from '../index';

/* eslint-disable */
const paths = ['/test1', '/test2'];
const Routes = [() => <div>route 1</div>, () => <div>route 2</div>];
const routes = [
  { key: '1', exact: true, path: paths[0], component: Routes[0] },
  { key: '2', exact: false, path: paths[1], component: Routes[1] },
  { key: '3', href: 'testHref' },
];

describe('<Router />', () => {
  let wrapper;
  let withRouter;
  beforeEach(() => {
    withRouter = mount(<MemoryRouter><Router routes={routes} /></MemoryRouter>);
    wrapper = withRouter.find(Router);
  });

  it('should render some routes', () => {
    // cannot snapshot due to key always changing...
    expect(wrapper.find(Route).exists()).toEqual(true);
  });

  it('should only render the component passed to the route', () => {
    // push first path into history and update references
    withRouter.children().prop('history').push(paths[0]);
    withRouter.update();
    wrapper = withRouter.find(Router);

    expect(wrapper.find(Route).find(Routes[0]).exists()).toEqual(true);
    expect(wrapper.find(Route).find(Routes[1]).exists()).toEqual(false);

    // push second path into history and update references
    withRouter.children().prop('history').push(paths[1]);
    withRouter.update();
    wrapper = withRouter.find(Router);

    expect(wrapper.find(Route).find(Routes[0]).exists()).toEqual(false);
    expect(wrapper.find(Route).find(Routes[1]).exists()).toEqual(true);
  });

  it('should not include routes that have no `path`', () => {
    withRouter.children().prop('history').push(routes[2].href);
    withRouter.update();
    wrapper = withRouter.find(Router);
    // renders first component instead...
    expect(wrapper.find(Route).find(Routes[0]).exists()).toEqual(true);
  });

  it('should redirect to the path of the first route', () => {
    // push unknown path into history and update references
    withRouter.children().prop('history').push('/asdfsdf');
    withRouter.update();
    wrapper = withRouter.find(Router);

    expect(wrapper.find(Route).find(Routes[0]).exists()).toEqual(true);
    expect(wrapper.find(Route).find(Routes[1]).exists()).toEqual(false);
  });
});
