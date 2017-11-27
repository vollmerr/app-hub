import React from 'react';
import { shallow } from 'enzyme';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';

import { testMapDispatchToProps } from 'utils/testUtils';
import { newAckRequest } from 'containers/Spa/actions';

import { SpaAdmin, mapDispatchToProps } from '../index';
import AdminNav from '../AdminNav';
import NewAckForm from '../NewAckForm';
import DisableModal from '../DisableModal';
import Report from '../Report';

const List = require.requireActual('components/List');

const props = {
  activeAcks: [],
  previousAcks: [],
  onNewAckRequest: jest.fn(),
};

const state = {
  hideDisable: true,
  hideNewAck: true,
  hideReport: true,
  selectedItem: {
    id: 1,
    isActive: true,
    name: 'test',
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
      xit('should update the api', () => {
        // TODO
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

    describe('handleConfirmDisable', () => {
      xit('should update the api', () => {
        // TODO
      });

      it('should hide the disable modal', () => {
        instance.handleHideDisable = jest.fn();
        instance.handleConfirmDisable();
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


  describe('mapDispatchToProps', () => {
    const actions = {
      newAckRequest,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
