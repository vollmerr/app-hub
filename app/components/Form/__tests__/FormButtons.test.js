import React from 'react';
import { shallow } from 'enzyme';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import { testStyledComponent } from 'utils/testUtils';

import FormButtons, { Buttons, Button } from '../FormButtons';


testStyledComponent(Buttons);
testStyledComponent(Button, DefaultButton);


const Child = () => <div>children...</div>;
const props = {
  disabled: false,
  reset: jest.fn(),
  children: <Child />,
};

describe('FormButtons', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<FormButtons {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Buttons', () => {
    expect(wrapper.find(Buttons).length).toEqual(1);
  });

  it('should render two Buttons (submit/clear)', () => {
    expect(wrapper.find(Button).length).toEqual(2);
  });

  it('should render children', () => {
    expect(wrapper.find(Child).length).toEqual(1);
  });
});
