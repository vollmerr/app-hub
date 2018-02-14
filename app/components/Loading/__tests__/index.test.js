import React from 'react';
import { shallow } from 'enzyme';

import Loading from '../index';
import ErrorMessage from '../ErrorMessage';
import LoadingMessage from '../LoadingMessage';

const error = { message: 'test error' };


describe('<TestPage />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Loading />);
  });

  it('should not render if not loading and no error', () => {
    expect(wrapper.children().length).toEqual(0);
  });


  describe('loading', () => {
    it('should render the loading message', () => {
      wrapper.setProps({ loading: true });
      expect(wrapper.find(LoadingMessage).length).toEqual(1);
      expect(wrapper.find(ErrorMessage).length).toEqual(0);
    });
  });


  describe('isLoading (react-loadable)', () => {
    beforeEach(() => {
      wrapper.setProps({ isLoading: true });
    });

    it('should only render an error if timed out', () => {
      wrapper.setProps({ timedOut: true });
      expect(wrapper.find(LoadingMessage).length).toEqual(0);
      expect(wrapper.find(ErrorMessage).length).toEqual(1);
    });

    it('should only render the loading message if past delay', () => {
      wrapper.setProps({ pastDelay: true });
      expect(wrapper.find(LoadingMessage).length).toEqual(1);
      expect(wrapper.find(ErrorMessage).length).toEqual(0);
    });

    it('should render nothing if not timedOut or pastDelay', () => {
      wrapper.setProps({ pastDelay: false, timedOut: false });
      expect(wrapper.find(LoadingMessage).length).toEqual(0);
      expect(wrapper.find(ErrorMessage).length).toEqual(0);
    });
  });


  describe('error', () => {
    beforeEach(() => {
      wrapper.setProps({ error });
    });

    it('should render an error if not loading', () => {
      expect(wrapper.find(ErrorMessage).length).toEqual(1);
    });

    it('should pass the error to ErrorMessage', () => {
      expect(wrapper.find(ErrorMessage).prop('error')).toEqual(error);
    });
  });
});
