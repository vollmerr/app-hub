import React from 'react';
import { shallow } from 'enzyme';

import { testMapDispatchToProps } from 'utils/testUtils';
import Content from 'components/App-Content/Content';
import { clearErrors } from 'containers/TestApp/actions';
import ErrorMessage from 'components/Loading/ErrorMessage';

import { TestAppHome, mapDispatchToProps } from '../index';

const props = {
  onClearErrors: jest.fn(),
  error: null,
};

describe('<TestAppHome />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<TestAppHome {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Content', () => {
    expect(wrapper.find(Content).length).toEqual(1);
  });

  it('should render an error message if passed an error', () => {
    wrapper.setProps({ error: 'test error' });
    expect(wrapper.find(ErrorMessage).length).toEqual(1);
  });

  describe('mapDispatchToProps', () => {
    const actions = {
      clearErrors,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
