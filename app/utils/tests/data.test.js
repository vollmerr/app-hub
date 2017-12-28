import { types, formatItem, formatItems, mapToColumns } from '../data';
import { formattedDate } from '../date';


const enums = {
  enum: {
    a: 'test 1',
    b: 'test 1',
  },
};

const fields = {
  date: { data: { type: types.date } },
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
      expect(formatItem(item, 'enum', fields.date, enums)).toEqual(enums.enum[item.enum] || '');
    });
  });

  it('should format dates', () => {
    items.forEach((item) => {
      expect(formatItem(item, 'date', fields.date)).toEqual(formattedDate(item.date));
    });
  });

  it('should format array data as a comma seperated string', () => {
    items.forEach((item) => {
      expect(formatItem(item, 'arr', {})).toEqual(item.arr.join(', '));
    });
  });
});

describe('formatItems', () => {
  it('should format all items correctly', () => {
    const formattedItems = formatItems(items, fields, enums);

    expect(formattedItems).toMatchSnapshot();
    expect(formattedItems.every((item) => (
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
    const actual = mapToColumns(toMap);
    expect(actual).toMatchSnapshot();
    expect(actual.length).toEqual(3);
  });

  it('should only use keys in `include` if provided', () => {
    const actual = mapToColumns(toMap, ['a', 'c']);
    expect(actual).toMatchSnapshot();
    expect(actual.length).toEqual(2);
  });

  it('should not use keys in `exclude` if provided', () => {
    const actual = mapToColumns(toMap, [], ['b', 'c']);
    expect(actual).toMatchSnapshot();
    expect(actual.length).toEqual(1);
  });
});
