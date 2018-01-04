import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import { PaasHome } from '../index';

const props = {
  authorizationList: fromJS([
    { sid: 'sid1', text: 'text 1' },
    { sid: 'sid2', text: 'text 2' },
  ]),
  authorizations: fromJS({
    sid1: { sid: 'sid1', text: 'text 1' },
    sid2: { sid: 'sid2', text: 'text 2' },
  }),
  Loading: null,
  pristine: false,
  submitting: false,
  reset: jest.fn(),
  handleSubmit: jest.fn(),
  initialize: jest.fn(),
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
