import React from 'react';
import { shallow } from 'enzyme';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';

import { testProps, testMapDispatchToProps } from '../../../../utils/testUtils';
import * as api from '../../../../utils/api';
import Loading from '../../../../components/Loading';

import * as C from '../../constants';
import {
  getReportDataRequest,
  updateUserManagerRequest,
} from '../../actions';

import { PasAdmin, mapDispatchToProps, Section } from '../index';

const List = require.requireActual('../../../../components/List');


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
  flex: 1,
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


// describe('<PasAdmin />', () => {
//   let wrapper;
//   let instance;
//   it('should show flex if not set', async () => {
//     props.flex = undefined;
//     wrapper = shallow(<PasAdmin {...props} />);
//     instance = wrapper.instance();
//     instance.form = form;
//     jest.resetAllMocks();
//     api.shouldFetch = jest.fn(() => true);
//     await instance.componentDidMount();
//     await instance.render();
//     expect(wrapper).toMatchSnapshot();
//   });
//   it('should show flex if set', () => {
//     props.flex = 2;
//     wrapper = shallow(<PasAdmin {...props} />);
//     instance = wrapper.instance();
//     instance.form = form;
//     expect(wrapper).toMatchSnapshot();
//   });
// });
describe('<Section />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Section />);
  });

  it('should render correctly with default flex 1', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with flex 10', () => {
    wrapper.setProps({ flex: 10 });
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<PasAdmin />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<PasAdmin {...props} />);
    instance = wrapper.instance();
    instance.form = form;
  });

  describe('this.selectionNoManager', () => {
    it('should be an instance of `Selection`', () => {
      expect(instance.selectionNoManager).toBeInstanceOf(Selection);
    });

    it('should call `handleSelectItem` when an item changes', () => {
      List.handleSelectItem = jest.fn();
      instance.selectionNoManager._onSelectionChanged(); // eslint-disable-line
      expect(List.handleSelectItem).toHaveBeenCalled();
    });
  });

  describe('this.selectionAssignedManager', () => {
    it('should be an instance of `Selection`', () => {
      expect(instance.selectionAssignedManager).toBeInstanceOf(Selection);
    });

    it('should call `handleSelectItem` when an item changes', () => {
      List.handleSelectItem = jest.fn();
      instance.selectionAssignedManager._onSelectionChanged(); // eslint-disable-line
      expect(List.handleSelectItem).toHaveBeenCalled();
    });
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


  describe('handleSelectItem', () => {
    it('should set the employee in state', () => {
      const employee = data.all[1];
      instance.handleSelectItem(employee);
      expect(wrapper.state('employee')).toEqual(employee);
    });

    it('should find and set the employee`s manager in state', () => {
      const employee = data.all[1];
      const manager = data.all[0];
      instance.handleSelectItem(employee);
      expect(wrapper.state('manager')).toEqual(manager);
    });

    it('should clear the manager if none found', () => {
      const employee = {};
      const manager = {
        [C.AUTH.FULL_NAME]: '',
      };
      instance.handleSelectItem(employee);
      expect(wrapper.state('manager')).toEqual(manager);
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

    it('should render correctly with flex set', () => {
      wrapper.setProps({ flex: 5 });
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly with flex not set', () => {
      wrapper.setProps({ flex: undefined });
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
