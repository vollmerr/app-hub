import { formattedDate } from '../date';

describe('date utils', () => {
  describe('formattedDate', () => {
    it('should return a formatted date', () => {
      const date = formattedDate(new Date('12/02/1987'));
      expect(date).toEqual('1987-12-02');
    });

    it('should be an empty string if not a valid date', () => {
      const date = formattedDate('abc');
      expect(date).toEqual('');
    });
  });
});
