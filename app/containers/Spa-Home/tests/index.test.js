import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';

import ListSection from 'components/List/ListSection';

import { SpaHome } from '../index';
import AckModal from '../AckModal';

const List = require.requireActual('components/List');

const props = {
  pendingAcks: fromJS([{
    id: 1,
    name: 'test1',
  }, {
    id: 3,
    name: 'test3',
  }]),
  previousAcks: fromJS([{
    id: 2,
    name: 'test2',
  }, {
    id: 4,
    name: 'test4',
  }]),
};


describe('<SpaHome />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<SpaHome {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render two sections with lists', () => {
    expect(wrapper.find(ListSection).length).toEqual(2);
    expect(wrapper.find(List.default).length).toEqual(2);
  });

  it('should render a modal for acknowledgments', () => {
    expect(wrapper.find(AckModal).length).toEqual(1);
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


  xdescribe('handleDownloadFile', () => {
    it('should handle downloading a file', () => {
      instance.handleDownloadFile();
      // TODO...
    });
  });


  describe('handleRead', () => {
    it('should set that the acknowledgment has been read', () => {
      instance.handleRead();
      expect(wrapper.state('hasRead')).toEqual(true);
    });

    it('should download a file for reading', () => {
      instance.handleDownloadFile = jest.fn();
      instance.handleRead();
      expect(instance.handleDownloadFile).toHaveBeenCalled();
    });
  });


  describe('handleAck', () => {
    xit('should update the API that the user has acknowledged', () => {
      // TODO
    });

    it('should close the modal', () => {
      instance.handleCloseModal = jest.fn();
      instance.handleAck();
      expect(instance.handleCloseModal).toHaveBeenCalled();
    });
  });


  describe('handleOpenModal', () => {
    it('should display the modal', () => {
      wrapper.setState({ hideModal: true });
      instance.handleOpenModal();
      expect(wrapper.state('hideModal')).toEqual(false);
    });

    it('should reset the acknowledgment to not being read', () => {
      wrapper.setState({ hasRead: true });
      instance.handleOpenModal();
      expect(wrapper.state('hasRead')).toEqual(false);
    });
  });


  describe('handleCloseModal', () => {
    it('should hide the modal', () => {
      wrapper.setState({ hideModal: false });
      instance.handleCloseModal();
      expect(wrapper.state('hideModal')).toEqual(true);
    });
  });
});
