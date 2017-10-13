import React from 'react';
import { shallow } from 'enzyme';

import testStyledComponent from 'utils/testStyledComponent';
import { authUserRequest } from 'containers/AppHub/actions';

import { Dev, Field, mapDispatchToProps } from '../Dev';

testStyledComponent(Field);

const user1 = { name: 'test name 1', key: 'test key 1' };
const user2 = { name: 'test name 3', key: 'test key 3' };

global.DEV_JWT = {
  group1: [
    user1,
    { name: 'test name 2', key: 'test key 2' },
  ],
  group2: [
    user2,
    { name: 'test name 4', key: 'test key 4' },
  ],
};

describe('<Dev />', () => {
  let wrapper;
  let onAuthUserRequest;
  beforeEach(() => {
    onAuthUserRequest = jest.fn();
    wrapper = shallow(<Dev onAuthUserRequest={onAuthUserRequest} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a h2 header', () => {
    expect(wrapper.find('h2').length).toEqual(1);
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
      expect(onAuthUserRequest).toHaveBeenCalled();
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

    describe('onAuthUserRequest', () => {
      it('should be injected', () => {
        expect(mappedDispatch.onAuthUserRequest).toBeDefined();
      });

      it('should dispatch exampleRequest when called', () => {
        mappedDispatch.onAuthUserRequest();
        expect(dispatch).toHaveBeenCalledWith(authUserRequest());
      });
    });
  });

  // KEEP LAST AS MODIFYING GLOBAL VARIABLE
  it('should not render if DEV_JWT does not exist (production)', () => {
    global.DEV_JWT = undefined;
    wrapper = shallow(<Dev onAuthUserRequest={onAuthUserRequest} />);
    expect(wrapper.equals(null)).toEqual(true);
  });
});
