import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';

import { testMapDispatchToProps } from 'utils/testUtils';
import { getUserDataRequest, readAckRequest } from 'containers/Spa/actions';
import { ACK } from 'containers/Spa/constants';
import ListSection from 'components/List/ListSection';

import { SpaHome, mapDispatchToProps } from '../index';
import AckModal from '../AckModal';

import * as request from 'utils/request'; // eslint-disable-line
request.doneLoading = jest.fn();
request.downloadFile = jest.fn();

const List = require.requireActual('components/List');


const props = {
  userCached: false,
  userPendingAcks: fromJS([{
    id: 1,
    name: 'test1',
  }, {
    id: 3,
    name: 'test3',
  }]),
  userPreviousAcks: fromJS([{
    id: 2,
    name: 'test2',
  }, {
    id: 4,
    name: 'test4',
  }]),
  onGetUserDataRequest: jest.fn(),
  onReadAckRequest: jest.fn(),
  Loading: null,
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

  it('should render the loading indicator if loading', () => {
    const Loading = () => <div>test loading...</div>;
    wrapper.setProps({ Loading: <Loading /> });
    expect(wrapper.find(Loading).length).toEqual(1);
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


  describe('componentDidMount', () => {
    it('should load the user data if not cached', () => {
      expect(props.onGetUserDataRequest).toHaveBeenCalled();
    });

    it('shoud not load the user data if it is cached', () => {
      wrapper.setProps({ userCached: true });
      jest.resetAllMocks();
      instance.componentDidMount();
      expect(props.onGetUserDataRequest).not.toHaveBeenCalled();
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

    it('should close the modal when done loading', async () => {
      await instance.handleSubmitAck();
      expect(request.doneLoading).toHaveBeenCalledWith(instance, instance.handleCloseModal);
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


  describe('mapDispatchToProps', () => {
    const actions = {
      getUserDataRequest,
      readAckRequest,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
