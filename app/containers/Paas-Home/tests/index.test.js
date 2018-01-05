import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import { testMapDispatchToProps } from 'utils/testUtils';
import { getManagerDataRequest } from 'containers/Paas/actions';

import { PaasHome, mapDispatchToProps } from '../index';


const authorizationList = [
  { sid: 'sid1', text: 'text 1' },
  { sid: 'sid2', text: 'text 2' },
];

const authorizations = {
  byId: {
    sid1: { sid: 'sid1', text: 'text 1' },
    sid2: { sid: 'sid2', text: 'text 2' },
  },
  allIds: ['sid1', 'sid2'],
};

const props = {
  onGetManagerDataRequest: jest.fn(),
  authorizationList: fromJS(authorizationList),
  authorizations: fromJS(authorizations),
  Loading: null,
  pristine: false,
  submitting: false,
  reset: jest.fn(),
  change: jest.fn(),
  handleSubmit: jest.fn(),
  initialize: jest.fn(),
};

const apps = ['app1', 'app2', 'app3', 'app4']; // TODO: API CALL.........


describe('<PaasHome />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<PaasHome {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the loading indicator if loading', () => {
    const Loading = () => <div>test loading...</div>;
    wrapper.setProps({ Loading: <Loading /> });
    expect(wrapper.find(Loading).length).toEqual(1);
  });

  describe('handleAuthorizeAll', () => {
    it('should dispatch `change` for all authorizations', () => {
      instance.handleAuthorizeAll();
      expect(props.change).toHaveBeenCalledWith(`${authorizations.allIds[0]}[${apps[3]}]`, 1);
      expect(props.change).toHaveBeenCalledWith(`${authorizations.allIds[1]}[${apps[0]}]`, 1);
    });
  });

  describe('mapDispatchToProps', () => {
    const actions = {
      getManagerDataRequest,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
