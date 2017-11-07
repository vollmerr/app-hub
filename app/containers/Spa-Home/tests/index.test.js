import React from 'react';
import { shallow } from 'enzyme';

import Content from 'components/App-Content/Content';
import ErrorMessage from 'components/Loading/ErrorMessage';

import { SpaHome } from '../index';

const props = {
  app: {
    error: null,
    loading: false,
  },
};

describe('<SpaHome />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<SpaHome {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Content', () => {
    expect(wrapper.find(Content).length).toEqual(1);
  });

  it('should render an error message if passed an error', () => {
    const app = { ...props.app, error: 'test error' };
    wrapper.setProps({ app });
    expect(wrapper.find(ErrorMessage).length).toEqual(1);
  });

  it('should indicate loading if loading', () => {
    const app = { ...props.app, loading: true };
    wrapper.setProps({ app });
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('p').text()).toContain('Loading');
  });
});
