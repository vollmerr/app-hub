import { escapeRegExp } from '../string';

describe('string utils', () => {
  describe('escapeRegExp', () => {
    it('should properly escape strings', () => {
      const chars = '.*+?^${}()|[]\\'.split('');
      chars.forEach((char) => {
        expect(escapeRegExp(char)).toEqual(`\\${char}`);
      });
    });
  });
});
