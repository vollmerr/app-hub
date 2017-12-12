import { dateWithoutTime } from '../date';

describe('date utils', () => {
  describe('dateWithoutTime', () => {
    it('should return a date with zeroed out time', () => {
      const date = dateWithoutTime(new Date());
      expect(date.getHours()).toEqual(0);
      expect(date.getMinutes()).toEqual(0);
      expect(date.getSeconds()).toEqual(0);
    });

    it('should be undefined if not a valid date', () => {
      const date = dateWithoutTime('abc');
      expect(date).toEqual(undefined);
    });
  });
});
