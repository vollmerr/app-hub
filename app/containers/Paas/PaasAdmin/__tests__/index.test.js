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
    { [C.AUTH.ID]: 'test', [C.AUTH.STATUS]: C.STATUS.ACTIVE, [C.AUTH.FULL_NAME]: 'abc def' },
    { [C.AUTH.ID]: '123', [C.AUTH.STATUS]: C.STATUS.ACTIVE, [C.AUTH.FULL_NAME]: 'ghi jkl' },
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

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the loading/error indicator if loading or an error', () => {
      wrapper.setProps({ app: { loading: 1 } });
      expect(wrapper.find(Loading).length).toEqual(1);
    });
  });


  // describe('handleAuthorizeAll', () => {
  //   it('should dispatch `change` for all authorizations in a batch', () => {
  //     const sid = '123';
  //     instance.handleAuthorizeAll(sid)();
  //     expect(change).toHaveBeenCalledWith(`${authorizations.allIds[0]}[${apps[3]}]`, 1);
  //     expect(change).toHaveBeenCalledWith(`${authorizations.allIds[1]}[${apps[0]}]`, 1);
  //   });
  // });


  // describe('handleDenyAll', () => {
  //   // it('should dispatch `change` for all authorizations', () => {
  //   //   const change = jest.fn();
  //   //   instance.handleAuthorizeAll(change)();
  //   //   expect(change).toHaveBeenCalledWith(`${authorizations.allIds[0]}[${apps[3]}]`, 1);
  //   //   expect(change).toHaveBeenCalledWith(`${authorizations.allIds[1]}[${apps[0]}]`, 1);
  //   // });
  // });

  // describe('changeAllApps', () => {

  // });


  describe('handleSubmit', () => {
    it('should this.setState({ selectedInitalAssignedMananger });', async () => {
      const values = { [C.MANAGE.MANAGER_ID]: 'test', [C.MANAGE.EMPLOYEE_ID]: '123' };
      await instance.handleSubmit(values);
      expect(props.onUpdateUserManagerRequest).toHaveBeenCalledWith(
        { employee: {
          _id: '123',
          fullName: 'ghi jkl',
          status: 'active' },
          employee_id: '123',
          manager: {
            _id: 'test',
            fullName: 'abc def',
            status: 'active' },
          manager_id: 'test',
        }
      );
    });
  });

  describe('renderForm', () => {
    it('should return a FormSection', async () => {
      const params = { handleSubmit: jest.fn(), reset: jest.fn(), submitting: true, pristine: false };
      shallow(await instance.renderForm(params));
    });
  });


  // describe('renderColumn', () => {
  //   // TODO !
  // });


  describe('mapDispatchToProps', () => {
    const actions = {
      getReportDataRequest,
      updateUserManagerRequest,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
