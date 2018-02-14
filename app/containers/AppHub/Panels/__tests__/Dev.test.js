import React from 'react';
import { shallow } from 'enzyme';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import { testStyledComponent } from '../../../../utils/testUtils';
import * as api from '../../../../utils/api';

import { authUser } from '../../actions';

import { Dev, Field, mapDispatchToProps } from '../Dev';


testStyledComponent(Field);


const user1 = { name: 'test name 1', key: 'test key 1' };
const user2 = { name: 'test name 3', key: 'test key 3' };

global.isDev = true;
global.isMock = true;
global.DEV = {
  JWT: {
    group1: [
      user1,
      { name: 'test name 2', key: 'test key 2' },
    ],
    group2: [
      user2,
      { name: 'test name 4', key: 'test key 4' },
    ],
  },
};
global.MOCK = {
  JWT: {
    group1: [
      user1,
      { name: 'test name 5', key: 'test key 5' },
    ],
    group2: [
      user2,
      { name: 'test name 7', key: 'test key 7' },
    ],
  },
};

const props = {
  user: {
    key: '123',
    name: 'user name',
    roles: ['role1', 'role2'],
  },
  onAuthUser: jest.fn(),
  onClick: jest.fn(),
};


describe('<Dev />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<Dev {...props} />);
    instance = wrapper.instance();
  });

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not render if DEV.JWT/MOCK.JWT does not exist', () => {
      const jwt = { ...global.DEV.JWT };
      try {
        global.DEV.JWT = undefined;
        wrapper = shallow(<Dev {...props} />);
        expect(wrapper.equals(null)).toEqual(true);
      } finally {
        global.DEV.JWT = jwt;
      }
    });

    it('should use the `DEV.JWT` jwts if in dev mode', () => {
      expect(global.jwts).toEqual(global.DEV.JWT);
    });

    it('should use the `MOCK.JWT` jwts if in mock mode', () => {
      try {
        global.isDev = false;
        wrapper = shallow(<Dev {...props} />);
        expect(global.jwts).toEqual(global.MOCK.JWT);
      } finally {
        global.isDev = true;
      }
    });

    it('should not render the panel if in production (no global.isDev or global.isMock)', () => {
      try {
        global.isMock = false;
        global.isDev = false;
        wrapper = shallow(<Dev {...props} />);
        expect(global.jwts).toEqual(undefined);
      } finally {
        global.isMock = true;
        global.isDev = true;
      }
    });

    it('should render a h2 header', () => {
      expect(wrapper.find('h2').length).toEqual(1);
    });

    it('should render a button for clearing the token from localStorage', () => {
      expect(wrapper.find(DefaultButton).length).toEqual(1);
    });

    it('should render the groups in their own group', () => {
      const groups = wrapper.findWhere((x) => x.prop('options'));
      // there are 2 groups
      expect(groups.length).toEqual(2);
      // user 1 in group 1, but not user2
      expect(groups.at(0).prop('options').includes(user1)).toEqual(true);
      expect(groups.at(0).prop('options').includes(user2)).toEqual(false);
      // user 2 in group 2, but not user1
      expect(groups.at(1).prop('options').includes(user1)).toEqual(false);
      expect(groups.at(1).prop('options').includes(user2)).toEqual(true);
    });
  });

  describe('handleClearToken', () => {
    beforeEach(() => {
      api.clearToken = jest.fn();
      instance = wrapper.instance();
    });

    it('should exist', () => {
      expect(instance.handleClearToken).toBeDefined();
    });

    it('should remove the token from localstorage', () => {
      instance.handleClearToken();
      expect(api.clearToken).toHaveBeenCalled();
    });
  });

  describe('handleClickUser', () => {
    beforeEach(() => {
      api.setToken = jest.fn();
      api.clearToken = jest.fn();
      instance = wrapper.instance();
    });

    it('should exist', () => {
      expect(instance.handleClickUser).toBeDefined();
    });

    it('should dispatch onAuthUserRequest when called', () => {
      instance.handleClickUser(user1);
      expect(props.onAuthUser).toHaveBeenCalled();
    });

    it('should update the local token if a user with a key is passed', () => {
      instance.handleClickUser(user1);
      expect(api.setToken).toHaveBeenCalled();
    });

    it('should clear the local token if no user or user key', () => {
      instance.handleClickUser();
      expect(api.clearToken).toHaveBeenCalled();
    });
  });

  describe('mapDispatchToProps', () => {
    let mappedDispatch;
    let dispatch;
    beforeEach(() => {
      dispatch = jest.fn();
      mappedDispatch = mapDispatchToProps(dispatch);
    });

    describe('onAuthUser', () => {
      it('should be injected', () => {
        expect(mappedDispatch.onAuthUser).toBeDefined();
      });

      it('should dispatch authUser when called', () => {
        mappedDispatch.onAuthUser();
        expect(dispatch).toHaveBeenCalledWith(authUser());
      });
    });
  });
});
