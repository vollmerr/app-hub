import React from 'react';
import { shallow } from 'enzyme';

import ErrorMessage from 'components/Loading/ErrorMessage';
import LoadingMessage from 'components/Loading/LoadingMessage';
import Content from 'components/App-Content/Content';

import { appPage } from '../appPage';

const Component = () => <div>test component</div>;
const props = {
  app: {
    error: null,
    loading: false,
  },
};

describe('appPage', () => {
  let wrapper;
  let WithAppPage;
  beforeEach(() => {
    WithAppPage = appPage(Component);
    wrapper = shallow(<WithAppPage {...props} />);
  });

  it('should be a HOC that returns a new component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the Component passed', () => {
    expect(wrapper.find(Component).length).toEqual(1);
  });

  it('should adopt the correct displayName', () => {
    // using `displayName`
    Component.displayName = 'testDisplayName';
    WithAppPage = appPage(Component);
    expect(WithAppPage.displayName).toEqual(Component.displayName);
    // using `name` from function style component
    Component.displayName = undefined;
    WithAppPage = appPage(Component);
    expect(WithAppPage.displayName).toEqual(Component.name);
  });

  it('should wrap the rendered Component in `Content` for styling', () => {
    expect(wrapper.find(Content).find(Component).length).toEqual(1);
  });

  it('should render an error message if passed an error', () => {
    const error = 'test error';
    wrapper.setProps({ ...props, app: { error } });
    expect(wrapper.find(ErrorMessage).length).toEqual(1);
  });

  it('should pass the `error` and `to` path to the error message', () => {
    const error = 'test error';
    wrapper.setProps({ ...props, app: { error, routes: [{ path: '/test-route' }] } });
    expect(wrapper.find(ErrorMessage).prop('error')).toEqual(error);
    expect(wrapper.find(ErrorMessage).prop('to')).toEqual('/test-route');
  });

  it('should pass the AppHub base route to the error message if no `to` provided', () => {
    const error = 'test error';
    wrapper.setProps({ ...props, app: { error } });
    expect(wrapper.find(ErrorMessage).prop('to')).toEqual('/');
  });

  it('should render a loading message if loading', () => {
    wrapper.setProps({ ...props, app: { loading: true } });
    expect(wrapper.find(LoadingMessage).length).toEqual(1);
  });
});

