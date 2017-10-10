import React from 'react';
import { shallow } from 'enzyme';
import Button from 'examples/common/Button';

import { Sagas } from '../index';

const mockData = {
  a: 1,
  b: 4,
};

const dispatch = jest.fn();

describe('<Sagas />', () => {
  it('should render the button for fetching data', () => {
    const wrapper = shallow(
      <Sagas data={mockData} dispatch={dispatch} />
    );
    expect(wrapper.find(Button).length).toBe(1);
  });

  xit('should handle clicking on the button for fecthing data', () => {
    // need to check support for react 16...
  });
});
