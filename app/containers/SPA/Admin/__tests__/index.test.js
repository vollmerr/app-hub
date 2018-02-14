import React from 'react';
import { shallow } from 'enzyme';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';

import { testProps, testMapDispatchToProps } from '../../../../utils/testUtils';
import * as api from '../../../../utils/api';
import Loading from '../../../../components/Loading';
import * as List from '../../../../components/List';

import LoadCommandBar from '../../../App/LoadCommandBar';

import {
  getAdminDataRequest,
  getGroupsRequest,
  newAckRequest,
} from '../../actions';

import { acknowledgment } from '../../data';
import * as C from '../../constants';

import { Admin, mapDispatchToProps } from '../index';
import NewAckForm from '../NewAckForm';


const props = {
  setCommandBar: jest.fn(),
  app: testProps.app,
  admin: {

  },
  adminActiveItems: [],
  adminPreviousItems: [],
  groups: {
    byId: {
      group1: { [C.GROUP.NAME]: 'group1Name' },
    },
    targetIds: ['group1'],
  },
  enums: {},
  onGetAdminDataRequest: jest.fn(),
  onGetGroupsRequest: jest.fn(),
  onNewAckRequest: jest.fn(),
  history: {
    push: jest.fn(),
  },
};


describe('<Admin />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<Admin {...props} />);
    instance = wrapper.instance();
    api.shouldFetch = jest.fn();
  });

  it('should create a new instance of `Selection` for active acknowledgments', () => {
    expect(instance.selectionActive).toBeInstanceOf(Selection);
  });

  it('should create a new instance of `Selection` for previous acknowledgments', () => {
    expect(instance.selectionPrev).toBeInstanceOf(Selection);
  });

  describe('selectionActive', () => {
    it('should be an instance of `Selection`', () => {
      expect(instance.selectionActive).toBeInstanceOf(Selection);
    });

    it('should call Lists `handleSelectItem` when an item changes', () => {
      List.handleSelectItem = jest.fn();
      instance.selectionActive._onSelectionChanged(); // eslint-disable-line
      expect(List.handleSelectItem).toHaveBeenCalled();
    });
  });


  describe('selectionPrev', () => {
    it('should be an instance of `Selection`', () => {
      expect(instance.selectionPrev).toBeInstanceOf(Selection);
    });

    it('should call Lists `handleSelectItem` when an item changes', () => {
      List.handleSelectItem = jest.fn();
      instance.selectionPrev._onSelectionChanged(); // eslint-disable-line
      expect(List.handleSelectItem).toHaveBeenCalled();
    });
  });


  describe('componentDidMount', () => {
    it('should get the admin data if its not fetched', async () => {
      jest.resetAllMocks();
      api.shouldFetch = jest.fn(() => true);
      await instance.componentDidMount();
      expect(props.onGetAdminDataRequest).toHaveBeenCalled();
      expect(props.onGetGroupsRequest).toHaveBeenCalled();
    });

    it('should not get the admin data if its already fetched', async () => {
      jest.resetAllMocks();
      api.shouldFetch = jest.fn(() => false);
      await instance.componentDidMount();
      expect(props.onGetAdminDataRequest).not.toHaveBeenCalled();
      expect(props.onGetGroupsRequest).not.toHaveBeenCalled();
    });
  });


  describe('getCommands', () => {
    it('should contain a `new` command for new acknowledgments', () => {
      const commandBar = instance.getCommands();
      expect(commandBar.items.filter((x) => x.key === 'new').length).toEqual(1);
    });
  });


  describe('getNewCommands', () => {
    it('should contain a `back` command for going back to the admin page', () => {
      const commandBar = instance.getNewCommands();
      expect(commandBar.items.filter((x) => x.key === 'back').length).toEqual(1);
    });
  });


  describe('handleShowNew', () => {
    it('should set the `options` for target groups and `minDate` for start and end date', async () => {
      wrapper.setState({ fields: acknowledgment });
      await instance.handleShowNew();
      expect(wrapper.state('fields')[C.ACK.TARGET_GROUPS].options).toBeDefined();
      expect(wrapper.state('fields')[C.ACK.START_DATE].minDate).toBeDefined();
      expect(wrapper.state('fields')[C.ACK.END_DATE].minDate).toBeDefined();
    });
  });


  describe('handleHideNew', () => {
    it('should hide the new acknowldgment form', () => {
      wrapper.setState({ hideNewAck: false });
      instance.handleHideNew();
      expect(wrapper.state('hideNewAck')).toEqual(true);
    });
  });


  describe('handleSubmitNew', () => {
    it('should hide the new acknowldgment form', () => {
      instance.handleHideNew = jest.fn();
      instance.handleSubmitNew();
      expect(instance.handleHideNew).toHaveBeenCalled();
    });

    it('should dispatch the `onNewAckRequest` action', () => {
      const values = { a: 1 };
      instance.handleHideNew = jest.fn();
      instance.handleSubmitNew(values);
      expect(props.onNewAckRequest).toHaveBeenCalledWith(values);
    });
  });


  describe('handleSelectItem', () => {
    it('should navigate to the spa report using the items id', () => {
      const item = {
        [C.ACK.ID]: 'testId',
      };
      instance.handleSelectItem(item);
      expect(props.history.push).toHaveBeenCalledWith('/spa/report/testId');
    });
  });


  describe('render', () => {
    it('should render the loading/error indicator if loading or an error', () => {
      wrapper.setProps({ app: { ...props.app, loading: 1 } });
      expect(wrapper.find(Loading).length).toEqual(1);
    });

    it('should render the new acknowledgment form if its not `hideNewAck`', () => {
      wrapper.setState({ hideNewAck: false });
      expect(wrapper.find(NewAckForm).length).toEqual(1);
    });

    it('should render the command bar if its not `hideNewAck`', () => {
      wrapper.setState({ hideNewAck: false });
      expect(wrapper.find(LoadCommandBar).length).toEqual(1);
    });

    it('should render two `List`s if `hideNewAck` and not loading', () => {
      expect(wrapper.find(List.default).length).toEqual(2);
    });

    it('should render the command bar if `hideNewAck` and not loading', () => {
      expect(wrapper.find(LoadCommandBar).length).toEqual(1);
    });
  });


  describe('mapDispatchToProps', () => {
    const actions = {
      getAdminDataRequest,
      getGroupsRequest,
      newAckRequest,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
