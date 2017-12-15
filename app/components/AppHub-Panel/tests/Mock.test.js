import React from 'react';
import { shallow } from 'enzyme';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import { testStyledComponent } from 'utils/testUtils';
import { authUser } from 'containers/AppHub/actions';

import { Mock, Field, mapDispatchToProps } from '../Mock';

testStyledComponent(Field);

const user1 = { name: 'test name 1', key: 'test key 1' };
const user2 = { name: 'test name 3', key: 'test key 3' };

global.MOCK = {
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

describe('<Mock />', () => {
  let wrapper;
  let onClick;
  let onAuthUser;
  beforeEach(() => {
    onClick = jest.fn();
    onAuthUser = jest.fn();
    wrapper = shallow(<Mock onClick={onClick} onAuthUser={onAuthUser} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
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

  describe('handleClearToken', () => {
    let instance;
    beforeEach(() => {
      global.localStorage.removeItem = jest.fn();
      window.location.reload = jest.fn();
      instance = wrapper.instance();
    });

    it('should exist', () => {
      expect(instance.handleClearToken).toBeDefined();
    });

    it('should remove the token from localstorage then refresh the window', () => {
      instance.handleClearToken();
      expect(global.localStorage.removeItem).toHaveBeenCalledWith('id_token');
      expect(window.location.reload).toHaveBeenCalled();
    });
  });

  describe('handleClickUser', () => {
    let instance;
    beforeEach(() => {
      global.localStorage = {
        setItem: jest.fn(),
        removeItem: jest.fn(),
      };
      instance = wrapper.instance();
    });

    it('should exist', () => {
      expect(instance.handleClickUser).toBeDefined();
    });

    it('should dispatch onAuthUserRequest when called', () => {
      instance.handleClickUser(user1);
      expect(onAuthUser).toHaveBeenCalled();
    });

    it('should update the local token if a user with a key is passed', () => {
      const setItem = global.localStorage.setItem;
      instance.handleClickUser(user1);
      expect(setItem).toHaveBeenCalled();
    });

    it('should clear the local token if no user or user key', () => {
      const removeItem = global.localStorage.removeItem;
      instance.handleClickUser();
      expect(removeItem).toHaveBeenCalled();
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

  // KEEP LAST AS MODIFYING GLOBAL VARIABLE
  it('should not render if MOCK.JWT does not exist (production/dev)', () => {
    global.MOCK.JWT = undefined;
    wrapper = shallow(<Mock onClick={onClick} onAuthUser={onAuthUser} />);
    expect(wrapper.equals(null)).toEqual(true);
  });
});
