import { isEmptyText } from '../validate';

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
});
