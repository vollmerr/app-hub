import React from 'react';
import { shallow } from 'enzyme';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';

import { testMapDispatchToProps } from '../../../../utils/testUtils';
import Loading from '../../../../components/Loading';
import * as data from '../../../../utils/data';
import * as api from '../../../../utils/api';

import { getUserDataRequest, readAckRequest } from '../../actions';
import { ACK } from '../../constants';

import { Home, mapDispatchToProps } from '../index';
import AckModal from '../AckModal';


const List = require.requireActual('../../../../components/List');

const props = {
  app: { loading: 0, error: null },
  user: { lastFetched: '01/01/2003' }, // eslint-disable-line
  enums: { [ACK.TARGET_GROUPS]: {} },
  userPendingItems: [{
    id: 1,
    name: 'test1',
  }, {
    id: 3,
    name: 'test3',
  }],
  userPreviousItems: [{
    id: 2,
    name: 'test2',
  }, {
    id: 4,
    name: 'test4',
  }],
  onGetUserDataRequest: jest.fn(),
  onReadAckRequest: jest.fn(),
};


describe('SPA - <Home />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<Home {...props} />);
    instance = wrapper.instance();
  });


  describe('this.selectionActive', () => {
    it('should be an instance of `Selection`', () => {
      expect(instance.selectionActive).toBeInstanceOf(Selection);
    });

    it('should call `handleSelectItem` when an item changes', () => {
      List.handleSelectItem = jest.fn();
      instance.selectionActive._onSelectionChanged(); // eslint-disable-line
      expect(List.handleSelectItem).toHaveBeenCalled();
    });
  });


  describe('this.selectionPrev', () => {
    it('should be an instance of `Selection`', () => {
      expect(instance.selectionPrev).toBeInstanceOf(Selection);
    });

    it('should call `handleSelectItem` when an item changes', () => {
      List.handleSelectItem = jest.fn();
      instance.selectionPrev._onSelectionChanged(); // eslint-disable-line
      expect(List.handleSelectItem).toHaveBeenCalled();
    });
  });


  describe('componentDidMount', () => {
    it('should load the user data if not cached', () => {
      api.shouldFetch = jest.fn(() => true);
      instance.componentDidMount();
      expect(props.onGetUserDataRequest).toHaveBeenCalled();
    });

    it('shoud not load the user data if it is cached', () => {
      api.shouldFetch = jest.fn(() => false);
      instance.componentDidMount();
      expect(props.onGetUserDataRequest).not.toHaveBeenCalled();
    });
  });


  describe('handleDownloadFile', () => {
    it('should handle downloading a file', () => {
      data.downloadFile = jest.fn();
      instance.handleDownloadFile();
      expect(data.downloadFile).toHaveBeenCalled();
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


  describe('handleSubmitAck', () => {
    let selectedItem;
    beforeEach(() => {
      selectedItem = { id: 'test', name: 'test name' };
      wrapper.setState({ selectedItem });
    });

    it('should update the API that the user has acknowledged', async () => {
      await instance.handleSubmitAck();
      expect(props.onReadAckRequest).toHaveBeenCalledWith(selectedItem);
    });

    it('should close the modal', async () => {
      instance.handleCloseModal = jest.fn();
      await instance.handleSubmitAck();
      expect(instance.handleCloseModal).toHaveBeenCalled();
    });
  });


  describe('handleOpenModal', () => {
    it('should display the modal', () => {
      wrapper.setState({ hideModal: true });
      instance.handleOpenModal();
      expect(wrapper.state('hideModal')).toEqual(false);
    });

    it('should reset the acknowledgment if there is an attachment', () => {
      const selectedItem = { id: 'test', [ACK.FILE_NAME]: 'test name', [ACK.FILE_CONTENT]: 'content...' };
      wrapper.setState({ hasRead: true, selectedItem });
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


  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render `Loading` if loading', () => {
      wrapper.setProps({ app: { loading: 3 } });
      expect(wrapper.find(Loading).length).toEqual(1);
    });

    it('should render `Loading` if an error', () => {
      wrapper.setProps({ app: { error: { message: 'error!' } } });
      expect(wrapper.find(Loading).length).toEqual(1);
    });

    it('should render two `List`s', () => {
      expect(wrapper.find(List.default).length).toEqual(2);
    });

    it('should render a modal for acknowledgments', () => {
      expect(wrapper.find(AckModal).length).toEqual(1);
    });
  });


  describe('mapDispatchToProps', () => {
    const actions = {
      getUserDataRequest,
      readAckRequest,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
