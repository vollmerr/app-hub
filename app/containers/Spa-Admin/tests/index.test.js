import React from 'react';
import { shallow } from 'enzyme';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';

import { testMapDispatchToProps } from 'utils/testUtils';

import {
  getAdminDataRequest,
  getGroupsRequest,
  getAckRecipientsRequest,
  newAckRequest,
  disableAckRequest,
} from 'containers/Spa/actions';

import { ACK, STATUS, RECIPIENT, GROUP } from 'containers/Spa/constants';
import ListSection from 'components/List/ListSection';
import SpaReport from 'containers/Spa-Report';

import { SpaAdmin, mapDispatchToProps } from '../index';
import AdminNav from '../AdminNav';
import NewAckForm from '../NewAckForm';
import DisableModal from '../DisableModal';
import EmailModal from '../EmailModal';

const List = require.requireActual('components/List');


const recipientsById = {
  m: { [RECIPIENT.ID]: 'm', [RECIPIENT.ACK_ID]: 'a' },
  p: { [RECIPIENT.ID]: 'p', [RECIPIENT.ACK_ID]: 'd' },
  n: { [RECIPIENT.ID]: 'n', [RECIPIENT.ACK_ID]: 'a' },
};

const adminActiveList = [
  { [ACK.ID]: 'a', [ACK.TITLE]: 'testPending1', [ACK.STATUS]: STATUS.ACTIVE },
  { [ACK.ID]: 'b', [ACK.TITLE]: 'testPending2', [ACK.STATUS]: STATUS.ACTIVE },
];

const adminPreviousList = [
  { [ACK.ID]: 'c', [ACK.TITLE]: 'testPrevious1', [ACK.STATUS]: STATUS.EXPIRED },
  { [ACK.ID]: 'd', [ACK.TITLE]: 'testPrevious2', [ACK.STATUS]: STATUS.DISABLED },
];

const groupsById = {
  m: { [GROUP.SID]: 'm', [GROUP.NAME]: 'test 1' },
};

const targetGroupIds = ['m'];

const props = {
  enums: {
    [ACK.TARGET_GROUPS]: {},
  },
  adminIsCached: false,
  recipientsById,
  groupsById,
  targetGroupIds,
  adminActiveList,
  adminPreviousList,
  adminCachedIds: ['a', 'b', 'c', 'd'],
  onGetAdminDataRequest: jest.fn(),
  onGetGroupsRequest: jest.fn(),
  onGetAckRecipientsRequest: jest.fn(),
  onNewAckRequest: jest.fn(),
  onDisableAckRequest: jest.fn(),
  Loading: null,
};

const state = {
  hideDisable: true,
  hideNewAck: true,
  hideReport: true,
  selectedItem: {
    [ACK.ID]: 1,
    [ACK.STATUS]: STATUS.ACTIVE,
    [ACK.TITLE]: 'test',
  },
};


describe('<SpaAdmin />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<SpaAdmin {...props} />);
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

  it('should render an `AdminNav`', () => {
    expect(wrapper.find(AdminNav).length).toEqual(1);
  });

  it('should render two lists (active and previous)', () => {
    expect(wrapper.find(List.default).length).toEqual(2);
  });

  it('should create a new instance of `Selection` for active acknowledgments', () => {
    expect(instance.selectionActive).toBeInstanceOf(Selection);
  });

  it('should create a new instance of `Selection` for previous acknowledgments', () => {
    expect(instance.selectionPrev).toBeInstanceOf(Selection);
  });


  describe('componentDidMount', () => {
    it('should get the admin data if its not already in the redux store (adminIsCached)', () => {
      expect(props.onGetAdminDataRequest).toHaveBeenCalled();
    });

    it('should not get the admin data if its already in the redux store (adminIsCached)', () => {
      wrapper.setProps({ adminIsCached: true });
      jest.resetAllMocks();
      instance.componentDidMount();
      expect(props.onGetAdminDataRequest).not.toHaveBeenCalled();
    });
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


  describe('New Acknowledgments', () => {
    describe('handleShowNew', () => {
      it('should render the new acknowledgment modal', () => {
        instance.handleShowNew();
        wrapper.update();
        expect(wrapper.find(NewAckForm).length).toEqual(1);
      });
    });

    describe('handleHideNew', () => {
      it('should hide the new acknowledgment modal', () => {
        wrapper.setState({ hideNewAck: false });
        instance.handleHideNew();
        wrapper.update();
        expect(wrapper.find(NewAckForm).length).toEqual(0);
      });
    });

    describe('handleSubmitNew', () => {
      it('should dispatch a new acknowledgment to the api with plain JS', () => {
        const newAcks = adminPreviousList;
        instance.handleSubmitNew(newAcks);
        expect(props.onNewAckRequest).toHaveBeenCalledWith(newAcks);
      });
    });
  });


  describe('Disable Acknowledgments', () => {
    beforeEach(() => {
      // requires report to be visibale with selected item
      wrapper.setState({ selectedItem: state.selectedItem, hideReport: false });
    });

    describe('handleShowDisable', () => {
      it('should render the disable modal', () => {
        instance.handleShowDisable();
        wrapper.update();
        expect(wrapper.find(DisableModal).prop('hidden')).toEqual(false);
      });
    });

    describe('handleHideDisable', () => {
      it('should hide the disable modal', () => {
        wrapper.setState({ hideDisable: false });
        instance.handleHideDisable();
        wrapper.update();
        expect(wrapper.find(DisableModal).prop('hidden')).toEqual(true);
      });
    });

    describe('handleSubmitDisable', () => {
      it('should submit a request for disabling the item to the api', () => {
        instance.handleSubmitDisable();
        expect(props.onDisableAckRequest).toHaveBeenCalled();
      });

      it('should hide the disable modal', () => {
        instance.handleHideDisable = jest.fn();
        instance.handleSubmitDisable();
        expect(instance.handleHideDisable).toHaveBeenCalled();
      });
    });
  });


  describe('Email Recipients', () => {
    beforeEach(() => {
      // requires report to be visibale with selected item
      wrapper.setState({ selectedItem: state.selectedItem, hideReport: false });
    });

    describe('handleShowDisable', () => {
      it('should render the email modal', () => {
        instance.handleShowEmail();
        wrapper.update();
        expect(wrapper.find(EmailModal).prop('hidden')).toEqual(false);
      });
    });

    describe('handleHideEmail', () => {
      it('should hide the email modal', () => {
        wrapper.setState({ hideEmail: false });
        instance.handleHideEmail();
        wrapper.update();
        expect(wrapper.find(EmailModal).prop('hidden')).toEqual(true);
      });
    });

    xdescribe('handleSubmitEmail', () => {
      it('should submit a request for emalling the message to the api', () => {
        // TODO
      });

      it('should hide the disable modal', () => {
        // TODO
      });
    });
  });


  describe('Reporting', () => {
    beforeEach(() => {
      // requires selected item
      wrapper.setState({ selectedItem: state.selectedItem });
    });

    describe('handleShowReport', () => {
      it('should render the report', () => {
        instance.handleShowReport();
        wrapper.update();
        expect(wrapper.find(SpaReport).length).toEqual(1);
      });
    });

    describe('handleHideReport', () => {
      it('should hide the report', () => {
        wrapper.setState({ hideReport: false });
        instance.handleHideReport();
        wrapper.update();
        expect(wrapper.find(SpaReport).length).toEqual(0);
      });
    });
  });


  describe('Navigation', () => {
    describe('navList', () => {
      it('should add a `new` button that calls `handleShowNew` onClick', () => {
        instance.handleShowNew = jest.fn();
        const items = instance.navList();
        // find new button, should only be one
        const btns = items.filter((item) => item.key === 'new');
        expect(btns.length).toEqual(1);
        // click on new button
        btns[0].onClick();
        expect(instance.handleShowNew).toHaveBeenCalled();
      });

      it('should add a `disable` and `email` button that calls `handleShowDisable` onClick if showing the report with an active item selected', () => {
        instance.handleShowDisable = jest.fn();
        instance.handleShowEmail = jest.fn();
        wrapper.setState({ selectedItem: state.selectedItem, hideReport: false });
        const items = instance.navList();
        // find disable button, should only be one
        const btns = items.filter((item) => item.key === 'disable' || item.key === 'email');
        expect(btns.length).toEqual(2);
        // click on disable button
        btns[0].onClick();
        expect(instance.handleShowDisable).toHaveBeenCalled();
        // click on email button
        btns[1].onClick();
        expect(instance.handleShowEmail).toHaveBeenCalled();
      });

      it('should not add a `disable` or `email` button if showing the report with no active item selected', () => {
        instance.handleShowDisable = jest.fn();
        wrapper.setState({ selectedItem: { ...state.selectedItem, [ACK.STATUS]: STATUS.DISABLED }, hideReport: false });
        const items = instance.navList();
        // find disable button, should be none
        const btns = items.filter((item) => item.key === 'disable' || item.key === 'email');
        expect(btns.length).toEqual(0);
      });

      it('should add a `back` button that calls `handleHideNew` onClick if showing the report', () => {
        instance.handleHideNew = jest.fn();
        wrapper.setState({ hideReport: false });
        const items = instance.navList();
        // find disable button, should only be one
        const btns = items.filter((item) => item.key === 'back');
        expect(btns.length).toEqual(1);
        // click on new button
        btns[0].onClick();
        expect(instance.handleHideNew).toHaveBeenCalled();
      });

      it('should add a `back` button that calls `handleHideNew` onClick if showing the new acknowledgment form', () => {
        instance.handleHideNew = jest.fn();
        wrapper.setState({ hideNewAck: false });
        const items = instance.navList();
        // find disable button, should only be one
        const btns = items.filter((item) => item.key === 'back');
        expect(btns.length).toEqual(1);
        // click on new button
        btns[0].onClick();
        expect(instance.handleHideNew).toHaveBeenCalled();
      });
    });


    describe('handleSelectItem', () => {
      it('should render the report', () => {
        const item = { [ACK.ID]: '999', name: 'test item' };
        instance.handleShowReport = jest.fn();
        instance.handleSelectItem(item);
        expect(instance.handleShowReport).toHaveBeenCalled();
      });

      it('should get the recipients from the api if no entry in `adminCachedIds`', () => {
        const item = { [ACK.ID]: 'noExist', name: 'test item' };
        instance.handleShowReport = jest.fn();
        instance.handleSelectItem(item);
        expect(props.onGetAckRecipientsRequest).toHaveBeenCalledWith(item);
      });

      it('should not get the recipients from the api if an entry exists in `adminCachedIds`', () => {
        const item = { [ACK.ID]: 'c', name: 'test item' };
        instance.handleShowReport = jest.fn();
        instance.handleSelectItem(item);
        expect(props.onGetAckRecipientsRequest).not.toHaveBeenCalled();
      });
    });


    describe('handleSelectActive', () => {
      it('should call `handleSelectItem` to select the item', () => {
        const item = { [ACK.ID]: '999', name: 'test item' };
        instance.handleSelectItem = jest.fn();
        instance.handleSelectActive(item);
        expect(instance.handleSelectItem).toHaveBeenCalledWith(item);
      });
    });


    describe('handleSelectPrevious', () => {
      it('should render the report', () => {
        const item = { [ACK.ID]: '999', name: 'test item' };
        instance.handleSelectItem = jest.fn();
        instance.handleSelectPrevious(item);
        expect(instance.handleSelectItem).toHaveBeenCalledWith(item);
      });
    });


    describe('handleBack', () => {
      it('should hide the new acknowledgment form', () => {
        instance.handleHideNew = jest.fn();
        instance.handleBack();
        expect(instance.handleHideNew).toHaveBeenCalled();
      });

      it('should hide the report', () => {
        instance.handleHideReport = jest.fn();
        instance.handleBack();
        expect(instance.handleHideReport).toHaveBeenCalled();
      });
    });
  });


  describe('renderContent', () => {
    it('should render a loading indicator only if there is one passed', () => {
      const Loading = () => <div>Loading...</div>;
      expect(wrapper.find(Loading).length).toEqual(0);
      wrapper.setProps({ Loading: <Loading /> });
      expect(wrapper.find(Loading).length).toEqual(1);
    });

    it('should render the new acknowledgment form only if it is not hidden', () => {
      expect(wrapper.find(NewAckForm).length).toEqual(0);
      wrapper.setState({ hideNewAck: false });
      expect(wrapper.find(NewAckForm).length).toEqual(1);
    });

    it('should render the report only if it is not hidden and an item is selected', () => {
      expect(wrapper.find(SpaReport).length).toEqual(0);
      wrapper.setState({ hideReport: false, selectedItem: { [ACK.ID]: 1 } });
      expect(wrapper.find(SpaReport).length).toEqual(1);
    });

    it('should render the disable modal only if the report is not hidden and an item is selected', () => {
      expect(wrapper.find(DisableModal).length).toEqual(0);
      wrapper.setState({ hideReport: false, selectedItem: { [ACK.ID]: 1 } });
      expect(wrapper.find(DisableModal).length).toEqual(1);
    });

    it('should render the email modal only if the report is not hidden and an item is selected', () => {
      expect(wrapper.find(EmailModal).length).toEqual(0);
      wrapper.setState({ hideReport: false, selectedItem: { [ACK.ID]: 1 } });
      expect(wrapper.find(EmailModal).length).toEqual(1);
    });

    it('should render two `ListSection`s (active and previous acknowledgments)', () => {
      expect(wrapper.find(ListSection).length).toEqual(2);
    });

    it('should render two `List`s (active and previous acknowledgments)', () => {
      // imported using require, so use .default
      expect(wrapper.find(List.default).length).toEqual(2);
    });
  });


  describe('mapDispatchToProps', () => {
    const actions = {
      getAdminDataRequest,
      getGroupsRequest,
      getAckRecipientsRequest,
      newAckRequest,
      disableAckRequest,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
