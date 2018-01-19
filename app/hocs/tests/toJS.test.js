import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import toJS from '../toJS';


const WrappedComponent = () => <div>test component</div>;


const prop = {
  array: ['test 1', 'test 2'],
  obj: {
    a: {
      b: 'c',
    },
    n: [1, 2, 3],
  },
  bool: false,
};

const props = {
  immutable: fromJS(prop),
  plain: prop,
};


describe('toJS', () => {
  let wrapper;
  let withJS;
  beforeEach(() => {
    jest.resetAllMocks();
    withJS = toJS(WrappedComponent)(props);
    wrapper = shallow(<div>{withJS}</div>);
  });

  it('should be a HOC that returns a new component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the Component passed', () => {
    expect(wrapper.find(WrappedComponent).length).toEqual(1);
  });

  it('should make the immutable props plain js', () => {
    expect(wrapper.find(WrappedComponent).prop('immutable')).toEqual(prop);
  });

  it('should pass the plain js props untouched', () => {
    expect(wrapper.find(WrappedComponent).prop('plain')).toEqual(prop);
  });
});

