import React from 'react';
import { shallow } from 'enzyme';

import LoadCommandBar from '../LoadCommandBar';


const props = {
  setCommandBar: jest.fn(),
  commandBar: {
    items: [{ a: 1, b: 4 }, { a: 2, b: 2 }],
  },
  disabled: false,
};


describe('<LoadCommandBar />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<LoadCommandBar {...props} />);
    instance = wrapper.instance();
    instance.setCommandBar = jest.fn();
  });


  // describe('componentDidMount', () => {
  //   it('should set the command bar', () => {
  //     instance.componentDidMount();
  //     expect(instance.setCommandBar).toHaveBeenCalled();
  //   });
  // });


  // describe('componentWillReceiveProps', () => {
  //   it('should set the command bar if the disabled status has changed', () => {
  //     instance.componentWillReceiveProps({ disabled: true, otherStuff: 123 });
  //     expect(instance.setCommandBar).toHaveBeenCalled();
  //   });

  //   it('should not set the command bar if the disabled status has not changed', () => {
  //     instance.componentWillReceiveProps({ disabled: false, otherStuff: 123 });
  //     expect(instance.setCommandBar).not.toHaveBeenCalled();
  //   });
  // });


  // describe('componentWillUnmount', () => {
  //   it('should clear the command bar', () => {
  //     instance.componentWillUnmount();
  //     expect(props.setCommandBar).toHaveBeenCalledWith(false);
  //   });
  // });

  describe.only('setCommandBar', () => {
    // beforeEach(() => {
    //   instance.setCommandBar.mockRestore();
    // });

    it('should set the command bar with items mapped out as disabled', () => {
      wrapper.setProps({ disabled: true });
      instance.setCommandBar.mockRestore();
      instance.setCommandBar();
      const commandBar = {
        items: props.commandBar.items.map((x) => ({ ...x, disabled: true })),
      };
      expect(props.setCommandBar).toHaveBeenCalledWith(commandBar);
    });
  });
});
