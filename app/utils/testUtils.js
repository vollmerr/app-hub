import React from 'react';
import { shallow } from 'enzyme';


export const testProps = {
  app: {
    loading: false,
    error: null,
    home: {
      path: '/test',
    },
  },
};


/**
 * Tests a styled-component for basic tests
 * such as rending correctly and adopting attributes
 *
 * @param {Object} Component    - React component under test
 * @param {Object} extend       - React component the component under test extends /  inherits from
 */
export function testStyledComponent(Component, extend = null) {
  describe(`<${Component.displayName} />`, () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Component />);
    });

    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it(`should render an <${Component.target}> tag`, () => {
      expect(wrapper.type()).toEqual(Component.target);
    });

    it('should have a className attribute', () => {
      expect(wrapper.prop('className')).toBeDefined();
    });

    it('should adopt a valid attribute', () => {
      const id = 'test';
      wrapper.setProps({ id });
      expect(wrapper.prop('id')).toEqual(id);
    });

    if (extend) {
      it(`should extend ${extend.name}`, () => {
        expect(wrapper.find(extend).exists()).toEqual(true);
      });
    } else {
      it('should not adopt an invalid attribute', () => {
        const attribute = 'test';
        wrapper.setProps({ attribute });
        expect(wrapper.prop('attribute')).toBeUndefined();
      });
    }
  });
}


/**
 * Tests a components for basic mapDispatchToProps information
 *
 * @param {func} mapDispatchToProps   - components mapDispatchToProps function
 * @param {object} actions            - functions in mapDispatchToProps to test
 */
export function testMapDispatchToProps(mapDispatchToProps, actions) {
  const onAction = (action) => (
    `on${action.charAt(0).toUpperCase()}${action.slice(1)}`
  );

  let dispatch;
  let dispatchProps;
  beforeEach(() => {
    dispatch = jest.fn();
    dispatchProps = mapDispatchToProps(dispatch);
  });

  Object.keys(actions).forEach((action) => {
    describe(onAction(action), () => {
      it('should be injected', () => {
        expect(dispatchProps[onAction(action)]).toBeDefined();
      });

      it('should dispatch when called', () => {
        dispatchProps[onAction(action)]();
        expect(dispatch).toHaveBeenCalled();
      });
    });
  });
}


/**
 * Tests a components for basic mapDispatchToProps information
 *
 * @param {string} name         - name of request action
 * @param {string} requestType  - name of request type constant
 * @param {object} actions      - actions that should be fired
 */
export function testApiCall(requestName, requestType, actions) {
  const name = requestName.slice(0, -('Request'.length));
  const type = requestType.slice(0, -('_REQUEST'.length));

  describe(name, () => {
    let expected;
    let payload;
    beforeEach(() => {
      payload = { data: 'test data' };
      expected = { payload };
    });

    it(`has a type of '${type}_REQUEST'`, () => {
      expected.type = `${type}_REQUEST`;
      delete expected.payload;
      expect(actions[`${name}Request`]()).toEqual(expected);
    });

    it(`has a type of '${type}_SUCCESS'`, () => {
      expected.type = `${type}_SUCCESS`;
      expect(actions[`${name}Success`](payload)).toEqual(expected);
    });

    it(`has a type of '${type}_FAILURE'`, () => {
      expected.type = `${type}_FAILURE`;
      expect(actions[`${name}Failure`](payload)).toEqual(expected);
    });
  });
}
