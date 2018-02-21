import React from 'react';
import { shallow } from 'enzyme';

import {
  testProps,
  testStyledComponent,
  testMapDispatchToProps,
} from '../../../../utils/testUtils';
import List from '../../../../components/List';
import Loading from '../../../../components/Loading';
import * as api from '../../../../utils/api';

import {
  getReportDataRequest,
  setReportKey,
  setReportFilter,
} from '../../actions';
import * as C from '../../constants';

import {
  PasReport,
  Wrapper,
  Section,
  AuthorizationList,
  mapDispatchToProps,
} from '../index';


testStyledComponent(Wrapper);
testStyledComponent(Section);
testStyledComponent(AuthorizationList, List);


const data = {
  all: [
    { [C.AUTH.ID]: 'a1', [C.AUTH.STATUS]: C.STATUS.APPROVED },
    { [C.AUTH.ID]: 'd1', [C.AUTH.STATUS]: C.STATUS.DENIED },
  ],
  [C.REPORT.APPROVED]: [
    { [C.AUTH.ID]: 'a1', [C.AUTH.STATUS]: C.STATUS.APPROVED },
  ],
  [C.REPORT.DENIED]: [
    { [C.AUTH.ID]: 'd1', [C.AUTH.STATUS]: C.STATUS.DENIED },
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
  },
  onGetReportDataRequest: jest.fn(),
  onSetReportKey: jest.fn(),
  onSetReportFilter: jest.fn(),
};


describe('<PasReport />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<PasReport {...props} />);
    instance = wrapper.instance();
    api.shouldFetch = jest.fn();
  });


  describe('componentDidMount', () => {
    it('should get the report data if its not fetched', async () => {
      jest.resetAllMocks();
      api.shouldFetch = jest.fn(() => true);
      await instance.componentDidMount();
      expect(props.onGetReportDataRequest).toHaveBeenCalled();
    });

    it('should not get the report data if its already fetched', async () => {
      jest.resetAllMocks();
      api.shouldFetch = jest.fn(() => false);
      await instance.componentDidMount();
      expect(props.onGetReportDataRequest).not.toHaveBeenCalled();
    });
  });


  describe('componentWillReceiveProps', () => {
    it('should build the columns if there is a different key', () => {
      wrapper.setState({ columns: [] });
      const newColumns = [{ key: 1 }, { key: 99 }];
      const nextProps = {
        ...props,
        report: {
          ...props.report,
          key: 999,
        },
        reportData: null,
      };
      instance.buildColumns = jest.fn(() => newColumns);
      instance.componentWillReceiveProps(nextProps);
      expect(instance.buildColumns).toHaveBeenCalled();
      expect(wrapper.state('columns')).toEqual(newColumns);
    });

    it('should map out the reoprt data for D3 in the format [ {key, value}, {...} ]', () => {
      const chartData = [
        { key: C.REPORT.APPROVED, value: props.reportData[C.REPORT.APPROVED].length },
        { key: C.REPORT.DENIED, value: props.reportData[C.REPORT.DENIED].length },
        { key: C.REPORT.PENDING, value: props.reportData[C.REPORT.PENDING].length },
        { key: C.REPORT.NO_MANAGER, value: props.reportData[C.REPORT.NO_MANAGER].length },
      ];

      wrapper.setState({ chartData: {} });
      instance.componentWillReceiveProps(props);
      expect(wrapper.state('chartData')).toEqual(chartData);
    });
  });


  xdescribe('buildColumns', () => {
    it('should have tests...', () => {
      // TODO: tests
    });
  });


  describe('handleClickReport', () => {
    it('should dispatch the `onSetReportKey` action to set which report key is set', () => {
      const key = 1;
      const value = { data: { key } };
      instance.handleClickReport(value);
      expect(props.onSetReportKey).toHaveBeenCalledWith(key);
      // using just key instead of obj.data.key
      props.onSetReportKey.mockReset();
      instance.handleClickReport(key);
      expect(props.onSetReportKey).toHaveBeenCalledWith(key);
    });
  });


  describe('handleChangeFilter', () => {
    it('should dispatch the `onSetReportFilter` action to set which report filters are set', () => {
      const filter = 'testFilter';
      const field = { key: 'filterKey' };
      const expected = { [filter]: field.key };
      instance.handleChangeFilter(filter)(field);
      expect(props.onSetReportFilter).toHaveBeenCalledWith(expected);
    });
  });


  xdescribe('renderColumn', () => {
    it('should have tests...', () => {
      // TODO: tests
    });
  });


  describe('render', () => {
    it('should render the loading/error indicator if loading or an error', () => {
      wrapper.setProps({ app: { ...props.app, loading: 1 } });
      expect(wrapper.find(Loading).length).toEqual(1);
    });

    xit('should render ...', () => {
      // TODO: tests
    });
  });


  describe('mapDispatchToProps', () => {
    const actions = {
      getReportDataRequest,
      setReportKey,
      setReportFilter,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
