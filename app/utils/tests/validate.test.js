import { isEmptyText, isEmptyDate } from '../validate';

describe('validate utils', () => {
  describe('isEmptyText', () => {
    it('should return `Required` for non string or empty values', () => {
      const values = [
        [],
        {},
        null,
        undefined,
        () => {},
        '',
      ];

      values.forEach((value) => {
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
      const values = [
        [],
        {},
        null,
        undefined,
        () => {},
        '',
      ];

      values.forEach((value) => {
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
});
