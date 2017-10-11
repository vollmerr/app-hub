import React from 'react';
import { shallow } from 'enzyme';
import Button from 'examples/common/Button';

import { Sagas } from '../index';


describe('<Sagas />', () => {
  let wrapper;
  let dispatch;
  let mockData;

  beforeEach(() => {
    mockData = { a: 1, b: 4 };
    dispatch = jest.fn();
    wrapper = shallow(
      <Sagas data={mockData} dispatch={dispatch} />
    );
  });

  it('should render the button for fetching data', () => {
    expect(wrapper.find(Button).length).toBe(1);
  });

  it('should handle clicking on the button for fetching data', () => {
    const onClick = jest.fn();
    wrapper.find(Button).dive().setProps({ onClick }).simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('should render data if it exists', () => {
    expect(wrapper.find('p').length).toBe(1);
  });

  it('should not render data if it does not exist', () => {
    wrapper = shallow(<Sagas dispatch={dispatch} />);
    expect(wrapper.find('p').length).toBe(0);
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeUsername', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeUsername).toBeDefined();
      });

      it('should dispatch changeUsername when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const username = 'mxstbr';
        result.onChangeUsername({ target: { value: username } });
        expect(dispatch).toHaveBeenCalledWith(changeUsername(username));
      });
    });
  });
});
