import React from 'react';
import { shallow } from 'enzyme';

import { PaasHome } from '../index';

const props = {
  handleSubmit: jest.fn(),
  pristine: false,
  reset: jest.fn(),
  submitting: false,
  Loading: null,
};


describe('<PaasHome />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<PaasHome {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the loading indicator if loading', () => {
    const Loading = () => <div>test loading...</div>;
    wrapper.setProps({ Loading: <Loading /> });
    expect(wrapper.find(Loading).length).toEqual(1);
  });
});
