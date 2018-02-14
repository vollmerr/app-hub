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
  disableAckRequest,
} from '../../actions';
import * as C from '../../constants';

import {
  Report,
  Wrapper,
  Section,
  RecipientList,
  mapDispatchToProps,
} from '../index';

jest.mock('../../../../utils/data');
const dataUtils = require('../../../../utils/data');


testStyledComponent(Wrapper);
testStyledComponent(Section);
testStyledComponent(RecipientList, List);


const data = [
  { id: 1, value: 'val1' },
  { id: 2, value: 'val2' },
  { id: 3, value: 'val3' },
];

const props = {
  app: testProps.app,
  report: {
    key: 'id1',
    lastFetchedById: {
      id1: '01/02/1969',
    },
    item: {
      [C.ACK.ID]: 'id1',
      [C.ACK.STATUS]: C.STATUS.ACTIVE,
      [C.ACK.TITLE]: 'testTitle',
    },
  },
  reportData: {
    [C.REPORT.PENDING]: [data[0]],
    [C.REPORT.PREVIOUS]: [data[1], data[2]],
  },
  enums: {},
  onGetReportDataRequest: jest.fn(),
  onSetReportKey: jest.fn(),
  onDisableAckRequest: jest.fn(),
  setCommandBar: jest.fn(),
  history: {
    push: jest.fn(),
  },
  match: {
    params: {
      id: 'id1',
    },
  },
};


describe('<Report />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<Report {...props} />);
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
    it('should map out the reoprt data for D3 in the format [ {key, value}, {...} ]', () => {
      const chartData = [
        { key: C.REPORT.PENDING, value: props.reportData[C.REPORT.PENDING].length },
        { key: C.REPORT.PREVIOUS, value: props.reportData[C.REPORT.PREVIOUS].length },
      ];
      wrapper.setState({ chartData: [] });
      instance.componentWillReceiveProps({ reportData: props.reportData });
      expect(wrapper.state('chartData')).toEqual(chartData);
    });

    it('should not perform actions if no data', () => {
      wrapper.setState({ chartData: [] });
      instance.componentWillReceiveProps({ reportData: null });
      expect(wrapper.state('chartData')).toEqual([]);
    });
  });


  describe('getCommands', () => {
    let report;
    beforeEach(() => {
      report = { ...props.report };
    });

    describe('back', () => {
      it('should contain a `back` command for returning to the admin page all the time', () => {
        const commandBar = instance.getCommands();
        expect(commandBar.items.filter((x) => x.key === 'back').length).toEqual(1);
      });
    });

    describe('download', () => {
      it('should contain a `download` command if not pending', () => {
        const commandBar = instance.getCommands();
        expect(commandBar.items.filter((x) => x.key === 'download').length).toEqual(1);
      });

      it('should not contain a `download` command if pending', () => {
        report.item = { [C.ACK.STATUS]: C.STATUS.PENDING };
        wrapper.setProps({ report });
        const commandBar = instance.getCommands();
        expect(commandBar.items.filter((x) => x.key === 'download').length).toEqual(0);
      });
    });

    describe('cancel', () => {
      it('should contain a `cancel` command if pending', () => {
        report.item = { [C.ACK.STATUS]: C.STATUS.PENDING };
        wrapper.setProps({ report });
        const commandBar = instance.getCommands();
        expect(commandBar.items.filter((x) => x.key === 'cancel').length).toEqual(1);
      });

      it('should not contain a `cancel` command if not pending', () => {
        const commandBar = instance.getCommands();
        expect(commandBar.items.filter((x) => x.key === 'cancel').length).toEqual(0);
      });
    });

    describe('disable', () => {
      it('should contain a `disable` command if active', () => {
        const commandBar = instance.getCommands();
        expect(commandBar.items.filter((x) => x.key === 'disable').length).toEqual(1);
      });

      it('should not contain a `disable` command if not active', () => {
        report.item = { [C.ACK.STATUS]: C.STATUS.EXPIRED };
        wrapper.setProps({ report });
        const commandBar = instance.getCommands();
        expect(commandBar.items.filter((x) => x.key === 'disable').length).toEqual(0);
      });
    });

    describe('email', () => {
      it('should contain a `email` command if active', () => {
        const commandBar = instance.getCommands();
        expect(commandBar.items.filter((x) => x.key === 'email').length).toEqual(1);
      });

      it('should not contain a `email` command if not active', () => {
        report.item = { [C.ACK.STATUS]: C.STATUS.EXPIRED };
        wrapper.setProps({ report });
        const commandBar = instance.getCommands();
        expect(commandBar.items.filter((x) => x.key === 'email').length).toEqual(0);
      });
    });
  });


  describe('handleBack', () => {
    it('should navigate to the admin page', () => {
      instance.handleBack();
      expect(props.history.push).toHaveBeenCalledWith('/spa/admin');
    });
  });


  describe('handleDownload', () => {
    it('should download the data to a csv file', () => {
      instance.handleDownload();
      expect(dataUtils.downloadFile).toHaveBeenCalled();
    });
  });


  describe('handleShowModal', () => {
    it('should make the modal by name visible', () => {
      instance.handleShowModal('testModal')();
      expect(wrapper.state('modals').testModal).toEqual(true);
    });
  });


  describe('handleHideModal', () => {
    it('should make the modal by name hidden', () => {
      instance.handleHideModal('testModal')();
      expect(wrapper.state('modals').testModal).toEqual(false);
    });
  });


  describe('handleSubmitDisable', () => {
    it('should dispatch the `onDisableAckRequest` action with the item to update the api', () => {
      instance.handleSubmitDisable();
      expect(props.onDisableAckRequest).toHaveBeenCalledWith(props.report.item);
    });

    it('should hide the disable modal', () => {
      instance.handleHideModal = jest.fn(() => () => 1);
      instance.handleSubmitDisable();
      expect(instance.handleHideModal).toHaveBeenCalled();
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
      disableAckRequest,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
