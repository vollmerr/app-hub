import React from 'react';
import { shallow } from 'enzyme';

import List from 'components/List';

import { SpaHome } from '../index';
import AckModal from '../AckModal';
import AckSection from '../AckSection';

const props = {
  app: {
    error: null,
    loading: false,
  },
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
    expect(wrapper.find(AckSection).length).toEqual(2);
    expect(wrapper.find(List).length).toEqual(2);
  });

  it('should render a modal for acknowledgments', () => {
    expect(wrapper.find(AckModal).length).toEqual(1);
  });

  xdescribe('handleDownloadFile', () => {
    it('should handle downloading a file', () => {
      instance.handleDownloadFile();
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

    it('should set the item selected', () => {
      const item = { test: 'test...' };
      wrapper.setState({ selectedItem: null });
      instance.handleOpenModal(item);
      expect(wrapper.state('selectedItem')).toEqual(item);
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
