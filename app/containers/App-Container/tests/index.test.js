import React from 'react';
import { shallow } from 'enzyme';

import AppNav from 'containers/App-Nav';
import { changeApp } from 'containers/AppHub/actions';
import { initialState } from 'containers/AppHub/reducer';
import { AppContainer, mapDispatchToProps } from '../index';

const props = {
  onChangeApp: jest.fn(),
  app: {
    routes: [
      { name: 'test route1' },
    ],
    meta: {
      title: 'test title',
      desc: 'test desc',
      keywords: 'test, keywords',
    },
  },
  isMobile: false,
  appRoutes: [
    { name: 'test route1' },
  ],
  appMeta: {
    title: 'test title',
    desc: 'test desc',
    keywords: 'test, keywords',
  },
};


describe('<AppContainer />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AppContainer {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render AppNav in desktop view', () => {
    expect(wrapper.find(AppNav).length).toEqual(1);
  });

  it('should not render AppNav in mobile view', () => {
    wrapper.setProps({ isMobile: true });
    expect(wrapper.find(AppNav).length).toEqual(0);
  });

  it('should dispatch onChangeApp with the app info when mounted', () => {
    expect(props.onChangeApp).toHaveBeenCalledWith(props.app);
  });

  it('should dispatch onChangeApp with the initial app info when unmounted', () => {
    wrapper.unmount();
    expect(props.onChangeApp).toHaveBeenCalledWith(initialState.app);
  });

  describe('mapDispatchToProps', () => {
    let mappedDispatch;
    let dispatch;
    beforeEach(() => {
      dispatch = jest.fn();
      mappedDispatch = mapDispatchToProps(dispatch);
    });

    describe('onChangeApp', () => {
      it('should be injected', () => {
        expect(mappedDispatch.onChangeApp).toBeDefined();
      });

      it('should dispatch exampleRequest when called', () => {
        mappedDispatch.onChangeApp(props.app);
        expect(dispatch).toHaveBeenCalledWith(changeApp(props.app));
      });
    });
  });
});
