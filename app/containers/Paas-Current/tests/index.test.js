import React from 'react';
import { shallow } from 'enzyme';

import { testMapDispatchToProps } from 'utils/testUtils';
import {
  getManagerDataRequest,
  updateUsersRequest,
} from 'containers/Paas/actions';

import { PaasCurrent, mapDispatchToProps } from '../index';


const managerItems = [
  { sid: 'sid1', text: 'text 1' },
  { sid: 'sid2', text: 'text 2' },
];

const managerById = {
  [managerItems[0].sid]: managerItems[0],
  [managerItems[1].sid]: managerItems[1],
};

const props = {
  managerItems,
  managerById,
  onGetManagerDataRequest: jest.fn(),
  onUpdateUsersRequest: jest.fn(),
  Loading: null,
};

const form = {
  batch: jest.fn(),
  change: jest.fn(),
};


describe('<PaasCurrent />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<PaasCurrent {...props} />);
    instance = wrapper.instance();
    instance.form = form;
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the loading indicator if loading', () => {
    const Loading = () => <div>test loading...</div>;
    wrapper.setProps({ Loading: <Loading /> });
    expect(wrapper.find(Loading).length).toEqual(1);
  });


  describe('componentDidMount', () => {
    it('should dispatch `onGetManagerDataRequest` then initalize the form', async () => {
      instance.initalizeForm = jest.fn();
      await instance.componentDidMount();
      expect(props.onGetManagerDataRequest).toHaveBeenCalled();
      expect(instance.initalizeForm).toHaveBeenCalled();
    });
  });


  describe('buildColumns', () => {
    it('should bind `renderColumn` to each column', () => {
      const onRender = jest.fn();
      instance.renderColumn = jest.fn((col) => onRender(col));
      const columns = [{ name: 'col1' }, { name: 'col2' }];
      const expected = [
        { ...columns[0], onRender: instance.renderColumn(columns[0]) },
        { ...columns[1], onRender: instance.renderColumn(columns[1]) },
      ];
      const actual = instance.buildColumns(columns);
      expect(actual).toEqual(expected);
    });
  });


  describe('initalizeForm', () => {
    // it('should dispatch `change` for all authorizations', () => {

    // });
  });


  describe('handleAuthorizeAll', () => {
    // it('should dispatch `change` for all authorizations in a batch', () => {
    //   const sid = '123';
    //   instance.handleAuthorizeAll(sid)();
    //   expect(change).toHaveBeenCalledWith(`${authorizations.allIds[0]}[${apps[3]}]`, 1);
    //   expect(change).toHaveBeenCalledWith(`${authorizations.allIds[1]}[${apps[0]}]`, 1);
    // });
  });


  describe('handleDenyAll', () => {
    // it('should dispatch `change` for all authorizations', () => {
    //   const change = jest.fn();
    //   instance.handleAuthorizeAll(change)();
    //   expect(change).toHaveBeenCalledWith(`${authorizations.allIds[0]}[${apps[3]}]`, 1);
    //   expect(change).toHaveBeenCalledWith(`${authorizations.allIds[1]}[${apps[0]}]`, 1);
    // });
  });

  describe('changeAllApps', () => {

  });


  describe('handleSubmit', () => {
    // it('should dispatch `change` for all authorizations', async () => {
    //   instance.initalizeForm = jest.fn();
    //   const values = [{ sid: '123', text: 'test' }]; // TODO: better test.... (picks off 'text', add other 'homeFields'....)
    //   await instance.handleSubmit(values);
    //   expect(props.onUpdateUsersRequest).toHaveBeenCalledWith([{ sid: '123' }]);
    //   expect(instance.initalizeForm).toHaveBeenCalled();
    // });
  });


  describe('renderColumn', () => {
    // TODO !
  });


  describe('mapDispatchToProps', () => {
    const actions = {
      getManagerDataRequest,
      updateUsersRequest,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
