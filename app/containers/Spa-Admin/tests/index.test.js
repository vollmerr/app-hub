import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';

import { testMapDispatchToProps } from 'utils/testUtils';
import { newAckRequest, disableAckRequest } from 'containers/Spa/actions';
import { ACK, STATUS } from 'containers/Spa/constants';

import { SpaAdmin, mapDispatchToProps } from '../index';
import AdminNav from '../AdminNav';
import NewAckForm from '../NewAckForm';
import DisableModal from '../DisableModal';
import Report from '../Report';

const List = require.requireActual('components/List');

const activeAcks = [
  { [ACK.ID]: 1, [ACK.TITLE]: 'testPending1', [ACK.STATUS]: STATUS.ACTIVE },
  { [ACK.ID]: 2, [ACK.TITLE]: 'testPending2', [ACK.STATUS]: STATUS.ACTIVE },
];

const previousAcks = [
  { [ACK.ID]: 3, [ACK.TITLE]: 'testPrevious1', [ACK.STATUS]: STATUS.EXIPRED },
  { [ACK.ID]: 4, [ACK.TITLE]: 'testPrevious2', [ACK.STATUS]: STATUS.DISABLED },
];

const props = {
  activeAcks: fromJS(activeAcks),
  previousAcks: fromJS(previousAcks),
  onNewAckRequest: jest.fn(),
  onDisableAckRequest: jest.fn(),
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


  describe('selectionActive', () => {
    it('should be an instance of `Selection`', () => {
      expect(instance.selectionActive).toBeInstanceOf(Selection);
    });

    it('should call `handleSelectItem` when an item changes', () => {
      List.handleSelectItem = jest.fn();
      instance.selectionActive._onSelectionChanged(); // eslint-disable-line
      expect(List.handleSelectItem).toHaveBeenCalled();
    });
  });


  describe('selectionPrev', () => {
    it('should be an instance of `Selection`', () => {
      expect(instance.selectionPrev).toBeInstanceOf(Selection);
    });

    it('should call `handleSelectItem` when an item changes', () => {
      List.handleSelectItem = jest.fn();
      instance.selectionPrev._onSelectionChanged(); // eslint-disable-line
      expect(List.handleSelectItem).toHaveBeenCalled();
    });
  });


  describe('New Acknowledgments', () => {
    describe('handleShowNew', () => {
      it('should display the new acknowledgment modal', () => {
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
      it('should dispatch a new acknowledgment to the api', () => {
        instance.handleSubmitNew(previousAcks);
        expect(props.onNewAckRequest).toHaveBeenCalledWith(previousAcks);
      });
    });
  });


  describe('Disable Acknowledgments', () => {
    beforeEach(() => {
      // requires report to be visibale with selected item
      wrapper.setState({ selectedItem: state.selectedItem, hideReport: false });
    });

    describe('handleShowDisable', () => {
      it('should display the disable modal', () => {
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


  describe('Reporting', () => {
    beforeEach(() => {
      // requires selected item
      wrapper.setState({ selectedItem: state.selectedItem });
    });

    describe('handleShowReport', () => {
      it('should display the report', () => {
        instance.handleShowReport();
        wrapper.update();
        expect(wrapper.find(Report).length).toEqual(1);
      });
    });

    describe('handleHideReport', () => {
      it('should hide the report', () => {
        wrapper.setState({ hideReport: false });
        instance.handleHideReport();
        wrapper.update();
        expect(wrapper.find(Report).length).toEqual(0);
      });
    });
  });


  describe('Navigation', () => {
    describe('navItems', () => {
      it('should add a `new` button that calls `handleShowNew` onClick', () => {
        instance.handleShowNew = jest.fn();
        const items = instance.navItems();
        // find new button, should only be one
        const btns = items.filter((item) => item.key === 'new');
        expect(btns.length).toEqual(1);
        // click on new button
        btns[0].onClick();
        expect(instance.handleShowNew).toHaveBeenCalled();
      });

      it('should add a `disable` button that calls `handleShowDisable` onClick if showing the report and active item selected', () => {
        instance.handleShowDisable = jest.fn();
        wrapper.setState({ selectedItem: state.selectedItem, hideReport: false });
        const items = instance.navItems();
        // find disable button, should only be one
        const btns = items.filter((item) => item.key === 'disable');
        expect(btns.length).toEqual(1);
        // click on new button
        btns[0].onClick();
        expect(instance.handleShowDisable).toHaveBeenCalled();
      });

      it('should add a `back` button that calls `handleHideNew` onClick if showing the report', () => {
        instance.handleHideNew = jest.fn();
        wrapper.setState({ hideReport: false });
        const items = instance.navItems();
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
        const items = instance.navItems();
        // find disable button, should only be one
        const btns = items.filter((item) => item.key === 'back');
        expect(btns.length).toEqual(1);
        // click on new button
        btns[0].onClick();
        expect(instance.handleHideNew).toHaveBeenCalled();
      });
    });

    describe('handleSelectActive', () => {
      it('should display the report', () => {
        instance.handleShowReport = jest.fn();
        instance.handleSelectActive();
        expect(instance.handleShowReport).toHaveBeenCalled();
      });
    });

    describe('handleSelectPrevious', () => {
      it('should display the report', () => {
        instance.handleShowReport = jest.fn();
        instance.handleSelectPrevious();
        expect(instance.handleShowReport).toHaveBeenCalled();
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


  describe('Rendering', () => {
    describe('renderItemColumn', () => {
      it('should render a column`s content as a string by default', () => {
        const content = 'test content';
        const item = {
          testFieldName: content,
        };
        const column = {
          fieldName: 'testFieldName',
        };
        const actual = instance.renderItemColumn(item, null, column);
        expect(actual).toEqual(content);
      });

      it('should render a column`s content as a comma seperated string if it`s an array', () => {
        const content = ['test', 'content'];
        const item = {
          testFieldName: content,
        };
        const column = {
          fieldName: 'testFieldName',
        };
        const actual = instance.renderItemColumn(item, null, column);
        expect(actual).toEqual(content.join(', '));
      });
    });

    describe('renderContent', () => {

    });
  });


  describe('mapDispatchToProps', () => {
    const actions = {
      newAckRequest,
      disableAckRequest,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
