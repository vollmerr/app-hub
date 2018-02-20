/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';

import { testProps, testMapDispatchToProps } from '../../../../utils/testUtils';
import * as api from '../../../../utils/api';
import Loading from '../../../../components/Loading';
import * as C from '../../constants';
import {
  getReportDataRequest,
  updateUserManagerRequest,
} from '../../actions';

import { PaasAdmin, mapDispatchToProps } from '../index';

// const props = {
//   app: {
//     loading: false,
//     error: null,
//   },
//   manager: {
//     lastFetched: '01/02/2012',
//   },
//   managerItems,
//   managerById,
//   onGetReportDataRequest: jest.fn(),
//   onUpdateUsersRequest: jest.fn(),
// };

const data = {
  all: [
    { [C.AUTH.ID]: 'test', [C.AUTH.SID]: 'testS', [C.AUTH.MANAGER_SID]: '123S', [C.AUTH.STATUS]: C.STATUS.ACTIVE, [C.AUTH.FULL_NAME]: 'abc def' },
    { [C.AUTH.ID]: '123', [C.AUTH.SID]: '123S', [C.AUTH.MANAGER_SID]: 'testS', [C.AUTH.STATUS]: C.STATUS.ACTIVE, [C.AUTH.FULL_NAME]: 'ghi jkl' },
  ],
  [C.REPORT.APPROVED]: [
    { [C.AUTH.ID]: 'a1', [C.AUTH.STATUS]: C.STATUS.ACTIVE },
  ],
  [C.REPORT.DENIED]: [
    { [C.AUTH.ID]: 'd1', [C.AUTH.STATUS]: C.STATUS.ACTIVE },
  ],
  [C.REPORT.PENDING]: [],
  [C.REPORT.NO_MANAGER]: [],
};

const props = {
  app: testProps.app,
  report: {
    key: C.REPORT.DENIED,
    lastFetched: '01/02/1969',
    data,
    filters: {},
  },
  reportData: {
    [C.REPORT.APPROVED]: data[C.REPORT.APPROVED],
    [C.REPORT.DENIED]: data[C.REPORT.DENIED],
    [C.REPORT.PENDING]: data[C.REPORT.PENDING],
    [C.REPORT.NO_MANAGER]: data[C.REPORT.NO_MANAGER],
    all: data.all,
  },
  onGetReportDataRequest: jest.fn(),
  onUpdateUserManagerRequest: jest.fn(),
};
const form = {
  batch: jest.fn(),
  change: jest.fn(),
};

const expUserManagerUpdateProps = {
  employee: data.all[1],
  [C.MANAGE.EMPLOYEE_ID]: '123',
  manager: data.all[0],
  [C.MANAGE.MANAGER_ID]: 'test',
};

describe('<PaasAdmin />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<PaasAdmin {...props} />);
    instance = wrapper.instance();
    instance.form = form;
  });


  describe('componentDidMount', () => {
    it('should dispatch `onGetReportDataRequest` if not cached', async () => {
      jest.resetAllMocks();
      api.shouldFetch = jest.fn(() => true);
      await instance.componentDidMount();
      expect(props.onGetReportDataRequest).toHaveBeenCalled();
    });

    it('should not dispatch `onUpdateUserManagerRequest` if cached', async () => {
      jest.resetAllMocks();
      api.shouldFetch = jest.fn(() => false);
      await instance.componentDidMount();
      expect(props.onUpdateUserManagerRequest).not.toHaveBeenCalled();
    });
  });

  describe('handleSelectNoManager', () => {
    it('should set selectedEmployee item in state', () => {
      const item = data.all[1];
      instance.handleSelectNoManager(item);
      expect(wrapper.state('selectedEmployee')).toEqual(item);
    });
    it('should set selectedInitalAssignedMananger is cleared', () => {
      const item = data.all[1];
      const s = {
        [C.AUTH.FULL_NAME]: '',
      };
      instance.handleSelectNoManager(item);
      expect(wrapper.state('selectedInitalAssignedMananger')).toEqual(s);
    });
  });

  describe('handleSelectAssignedManager', () => {
    it('should set selectedEmployee item in state', () => {
      const item = data.all[1];
      instance.handleSelectAssignedManager(item);
      expect(wrapper.state('selectedEmployee')).toEqual(item);
    });
    it('should set selectedInitalAssignedMananger is cleared', () => {
      const item = data.all[1];
      const s = data.all[0];
      instance.handleSelectAssignedManager(item);
      expect(wrapper.state('selectedInitalAssignedMananger')).toEqual(s);
    });
  });


  describe('handleSubmit', () => {
    it('should this.setState({ selectedInitalAssignedMananger });', async () => {
      const values = { [C.MANAGE.MANAGER_ID]: 'test', [C.MANAGE.EMPLOYEE_ID]: '123' };
      await instance.handleSubmit(values);
      expect(props.onUpdateUserManagerRequest).toHaveBeenCalledWith(expUserManagerUpdateProps);
    });
  });

  describe('renderForm', () => {
    it('should return a FormSection', async () => {
      const params = { handleSubmit: jest.fn(), reset: jest.fn(), submitting: true, pristine: false };
      const FN = () => instance.renderForm(params);
      const section = shallow(<FN />);
      expect(section).toMatchSnapshot();
    });
  });

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the loading/error indicator if loading or an error', () => {
      wrapper.setProps({ app: { loading: 1 } });
      expect(wrapper.find(Loading).length).toEqual(1);
    });
  });

  describe('mapDispatchToProps', () => {
    const actions = {
      getReportDataRequest,
      updateUserManagerRequest,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
