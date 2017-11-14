import React from 'react';
import { shallow } from 'enzyme';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';

import { SpaAdmin } from '../index';
import AdminNav from '../AdminNav';
import NewAckForm from '../NewAckForm';
import DisableModal from '../DisableModal';

const props = {};

const state = {
  selectedItem: {
    name: 'test name',
    id: 'testKey',
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

  it('should create a new instance of `Selection` on `this.selection`', () => {
    expect(instance.selection).toBeInstanceOf(Selection);
  });

  it('should update the selected item whent the selection has changed', () => {
    instance.handleSelectItem = jest.fn();
    instance.selection._onSelectionChanged(); // eslint-disable-line
    expect(instance.handleSelectItem).toHaveBeenCalled();
  });


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

    it('should add a `disable` button that calls `handleShowDisable` onClick', () => {
      instance.handleShowDisable = jest.fn();
      wrapper.setState({ selectedItem: state.selectedItem });
      const items = instance.navItems();
      // find disable button, should only be one
      const btns = items.filter((item) => item.key === 'disable');
      expect(btns.length).toEqual(1);
      // click on new button
      btns[0].onClick();
      expect(instance.handleShowDisable).toHaveBeenCalled();
    });

    it('should only render 2 buttons (new, disable) if `hideNewAck`', () => {
      wrapper.setState({ selectedItem: state.selectedItem });
      const items = instance.navItems();
      expect(items.length).toEqual(2);
    });

    it('should only render 1 button (back) if not `hideNewAck`', () => {
      wrapper.setState({ hideNewAck: false, selectedItem: state.selectedItem });
      const items = instance.navItems();
      expect(items.length).toEqual(1);
    });

    it('should add a `back` button that calls `handleHideNew` onClick', () => {
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


  describe('handleSelectItem', () => {
    it('should update the `selectedItem` to the selected item', () => {
      instance.selection = {
        getSelectedCount: jest.fn(() => 1), // should only ever be 1 but lets make sure it works if more get selected somehow
        getSelection: jest.fn(() => [state.selectedItem]),
      };
      instance.handleSelectItem();
      wrapper.update();
      expect(wrapper.state('selectedItem')).toEqual(state.selectedItem);
    });

    it('should clear the `selectedItem` if there is no selected item', () => {
      // set state to make sure it changes to no selection
      wrapper.setState({ selectedItem: state.selectedItem });
      instance.selection = {
        getSelectedCount: jest.fn(() => 0),
      };
      instance.handleSelectItem();
      wrapper.update();
      expect(wrapper.state('selectedItem')).toEqual({});
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
      it('should update the api', () => {
        // TODO
      });

      it('should hide the disable modal', () => {
        instance.handleHideDisable = jest.fn();
        instance.handleConfirmDisable();
        expect(instance.handleHideDisable).toHaveBeenCalled();
      });
    });
  });
});
