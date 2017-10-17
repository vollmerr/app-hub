import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'office-ui-fabric-react/lib/List';
import 'jest-styled-components';

import Link from 'components/Link';
import { testStyledComponent } from 'utils/testUtils';

import Updates, {
  Wrapper,
  Padded,
  Header,
  Item,
  Date,
  Name,
  ReadMore,
} from '../Updates';

testStyledComponent(Wrapper);

describe('<Wrapper />', () => {
  it('should render correctly in mobile view', () => {
    const wrapper = shallow(<Wrapper isMobile />);
    expect(wrapper).toMatchSnapshot();
  });
});

testStyledComponent(Padded);
testStyledComponent(Header);
testStyledComponent(Item);
testStyledComponent(Date);
testStyledComponent(Name, Link);
testStyledComponent(ReadMore);

const props = {
  isMobile: false,
};

const item = {
  name: 'test name',
  desc: 'test desc',
};

describe('<Updates />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<Updates {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a header that is the name is reading more else `Updates`', () => {
    expect(wrapper.find(Header).length).toEqual(1);
    expect(wrapper.find(Header).children().text()).toEqual('Updates');

    wrapper.setState({ isReadingMore: true, name: item.name });
    expect(wrapper.find(Header).children().text()).toEqual(item.name);
  });

  it('should render a back button if reading more', () => {
    instance.handleClickRead = jest.fn();
    wrapper.setState({ isReadingMore: true });
    expect(wrapper.find(ReadMore).children().text()).toEqual('Back');

    wrapper.find(ReadMore).simulate('click');
    expect(instance.handleClickRead).toHaveBeenCalled();
  });

  it('should render a desciption if reading more', () => {
    wrapper.setState({ isReadingMore: true, desc: item.desc });
    expect(wrapper.find('div').childAt(0).text()).toEqual(item.desc);
  });

  it('should render a `List` of updates if not reading more', () => {
    const renderCell = wrapper.instance().renderCell;
    expect(wrapper.find(List).length).toEqual(1);
    expect(wrapper.find(List).prop('onRenderCell')).toEqual(renderCell);
  });

  describe('handleClickRead', () => {
    it('should set the item passed', () => {
      instance.handleClickRead(item);
      expect(wrapper.state('name')).toEqual(item.name);
      expect(wrapper.state('desc')).toEqual(item.desc);
      expect(wrapper.state('isReadingMore')).toEqual(item.name);
    });

    it('should set no item when not passed one', () => {
      instance.handleClickRead();
      expect(wrapper.state('name')).toEqual();
      expect(wrapper.state('desc')).toEqual();
      expect(wrapper.state('isReadingMore')).toEqual();
    });
  });

  describe('renderCell', () => {
    let cellWrapper;
    beforeEach(() => {
      instance.handleClickRead = jest.fn();
      cellWrapper = shallow(instance.renderCell(item));
    });

    it('should render a date and name', () => {
      expect(cellWrapper.find(Date).length).toEqual(1);
      expect(cellWrapper.find(Name).length).toEqual(1);
    });

    it('should render a read more button that calls `handleClickRead`', () => {
      expect(cellWrapper.find(ReadMore).children().text()).toEqual('Read More');

      cellWrapper.find(ReadMore).simulate('click');
      expect(instance.handleClickRead).toHaveBeenCalledWith(item);
    });
  });
});
