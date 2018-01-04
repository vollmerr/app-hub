import { fromJS } from 'immutable';

import {
  isEmptyText,
  isEmptyDate,
  isFutureDate,
  isEmptyChecks,
  isEmptyFile,
  isNull,
} from '../validate';

const emptyVals = [
  [],
  {},
  null,
  undefined,
  () => {},
  '',
];

describe('validate utils', () => {
  describe('isEmptyText', () => {
    it('should return `Required` for non string or empty values', () => {
      emptyVals.forEach((value) => {
        expect(isEmptyText(value)).toEqual('Required');
      });
    });

    it('should return `undefined` for non empty strings', () => {
      const values = [
        '!@$&%&^%61527[]+_P{p]9',
        'test string',
      ];

      values.forEach((value) => {
        expect(isEmptyText(value)).toEqual(undefined);
      });
    });
  });


  describe('isEmptyDate', () => {
    it('should return `Required` for empty values', () => {
      emptyVals.forEach((value) => {
        expect(isEmptyDate(value)).toEqual('Required');
      });
    });

    it('should return `undefined` for non empty strings', () => {
      const values = [
        '2017-10-18T07:00:00.000Z',
        '12/27/2017',
        new Date('12/12/2001'),
      ];

      values.forEach((value) => {
        expect(isEmptyDate(value)).toEqual(undefined);
      });
    });
  });


  describe('isFutureDate', () => {
    it('should return `A future date is required` for valid past dates', () => {
      const pastDates = [
        new Date('12/12/1980'),
        '01/02/2017',
        '2007-10-18T07:00:00.000Z',
      ];

      pastDates.forEach((value) => {
        expect(isFutureDate(value)).toEqual('A future date is required');
      });
    });

    it('should return `undefined` for future dates or invalid dates', () => {
      const futureDates = [
        '2047-10-18T07:00:00.000Z',
        '12/27/2080',
        new Date('12/12/2101'),
        new Date(),
      ];

      futureDates.forEach((value) => {
        expect(isFutureDate(value)).toEqual(undefined);
      });

      emptyVals.forEach((value) => {
        expect(isFutureDate(value)).toEqual(undefined);
      });
    });
  });


  describe('isEmptyChecks', () => {
    it('should return `Required` for empty check box group', () => {
      const values = [...emptyVals, ['sdfs'], 'test value'];

      values.forEach((value) => {
        expect(isEmptyChecks(value)).toEqual('Required');
      });
    });

    it('should return `undefined` for non empty check box group', () => {
      const values = [
        fromJS(['sdfs']),
        fromJS([{ key: 1, a: '213' }, { key: 2, b: 'asd' }]),
      ];

      values.forEach((value) => {
        expect(isEmptyChecks(value)).toEqual(undefined);
      });
    });
  });


  describe('isEmptyFiles', () => {
    it('should return `Required` for empty check box group', () => {
      const values = [...emptyVals, { x: 'test1' }, 'test value'];

      values.forEach((value) => {
        expect(isEmptyFile(value)).toEqual('Required');
      });
    });

    it('should return `undefined` for non empty files with a `name`', () => {
      const values = [
        { name: 'test1' },
        { key: 1, name: '213' },
      ];

      values.forEach((value) => {
        expect(isEmptyFile(value)).toEqual(undefined);
      });
    });
  });


  describe('isNull', () => {
    it('should return `Required` for undefined or null', () => {
      const values = [undefined, null];

      values.forEach((value) => {
        expect(isNull(value)).toEqual('Required');
      });
    });

    it('should return `undefined` for anything but undefined or null ', () => {
      const values = [
        { name: 'test1' },
        0,
        [],
        'test...',
      ];

      values.forEach((value) => {
        expect(isNull(value)).toEqual(undefined);
      });
    });
  });
});
