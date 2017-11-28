import { mapToColumns } from '../mapped';

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
