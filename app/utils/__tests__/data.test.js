import { fromJS } from 'immutable';

import { formattedDate } from '../date';
import * as data from '../data';


const enums = {
  enum: {
    a: 'test 1',
    b: 'test 1',
  },
};

const fields = {
  date: { data: { type: data.types.date } },
  enum: {},
  arr: {},
};

const items = [
  { arr: ['a', 'b'], date: null, enum: 'a' },
  { arr: [], date: '2001/01/02', enum: 'b' },
  { arr: ['c'], date: new Date('2017/10/01'), enum: null },
];


describe('formatItem', () => {
  it('should format enums as their enum value', () => {
    items.forEach((item) => {
      expect(data.formatItem(item, 'enum', fields.date, enums)).toEqual(enums.enum[item.enum] || '');
    });
  });

  it('should format dates', () => {
    items.forEach((item) => {
      expect(data.formatItem(item, 'date', fields.date)).toEqual(formattedDate(item.date));
    });
  });

  it('should format array data as a comma seperated string', () => {
    items.forEach((item) => {
      expect(data.formatItem(item, 'arr', {})).toEqual(item.arr.join(', '));
    });
  });
});


describe('formatList', () => {
  it('should format all items correctly', () => {
    const formattedList = data.formatList(items, fields, enums);

    expect(formattedList).toMatchSnapshot();
    expect(formattedList.every((item) => (
      Object.values(item).every((v) => typeof v === 'string')
    ))).toEqual(true);
  });
});


const toMap = {
  a: { name: 'testName1', label: 'testLabel1', otherStuff: 'testing...' },
  b: { name: 'testName2', label: 'testLabel2', otherStuff: 'testing...' },
  c: { name: 'testName3', label: 'testLabel3', otherStuff: 'testing...' },
};


describe('mapToColumns', () => {
  it('should map the object to the correct format for office-ui-fabric-react DetailsList`s', () => {
    const actual = data.mapToColumns(toMap);
    expect(actual).toMatchSnapshot();
    expect(actual.length).toEqual(3);
  });

  it('should only use keys in `include` if provided', () => {
    const actual = data.mapToColumns(toMap, ['a', 'c']);
    expect(actual).toMatchSnapshot();
    expect(actual.length).toEqual(2);
  });

  it('should not use keys in `exclude` if provided', () => {
    const actual = data.mapToColumns(toMap, [], ['b', 'c']);
    expect(actual).toMatchSnapshot();
    expect(actual.length).toEqual(1);
  });
});


describe('normalizeById', () => {
  let arr;
  let expected;
  beforeEach(() => {
    arr = [
      { a: 'a', id: '1', z: [1, 2, 3] },
      { a: 'm', id: '2', p: { r: 'test' } },
    ];
    expected = {
      byId: {
        [arr[0].a]: arr[0],
        [arr[1].a]: arr[1],
      },
      allIds: [arr[0].a, arr[1].a],
    };
  });

  it('should return an array of all ids', () => {
    expect(data.normalizeById(arr, 'a').byId).toEqual(expected.byId);
  });

  it('should return the objects indexed by id', () => {
    expect(data.normalizeById(arr, 'a').allIds).toEqual(expected.allIds);
  });

  it('should set a default key if none provided', () => {
    expected = {
      byId: {
        [arr[0].id]: arr[0],
        [arr[1].id]: arr[1],
      },
      allIds: [arr[0].id, arr[1].id],
    };
    expect(data.normalizeById(arr)).toEqual(expected);
  });
});


describe('mergeById', () => {
  const testSection = {
    byId: {
      a: {
        b: 'test 1',
      },
      z: {
        m: [1, 2, 3],
      },
    },
    allIds: ['a', '0'],
  };
  const section = 'testSection';

  let state;
  let values;
  let expected;
  beforeEach(() => {
    state = fromJS({
      testSection,
    });
    values = [
      { a: 'c', id: '78', test: 1 },
      { a: 'f', id: '90', stuff: [1, 3, 5] },
    ];
    expected = fromJS({
      byId: {
        ...testSection.byId,
        [values[0].a]: values[0],
        [values[1].a]: values[1],
      },
      allIds: [...testSection.allIds, values[0].a, values[1].a],
    });
  });

  it('should return a List of all ids merged with the old ones', () => {
    expect(data.mergeById(state, section, values, 'a').get('byId')).toEqual(expected.get('byId'));
  });

  it('should return the objects indexed by id', () => {
    expect(data.mergeById(state, section, values, 'a').get('allIds')).toEqual(expected.get('allIds'));
  });

  it('should set a default key if none provided', () => {
    expected = fromJS({
      byId: {
        ...testSection.byId,
        [values[0].id]: values[0],
        [values[1].id]: values[1],
      },
      allIds: [...testSection.allIds, values[0].id, values[1].id],
    });
    expect(data.mergeById(state, section, values).toJS()).toEqual(expected.toJS());
  });
});
