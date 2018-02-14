import * as C from '../../constants';

import validate from '../validate';


describe('validate', () => {
  it('should set an error for an app if one but not all of the values are null / undefined', () => {
    const apps = C.APP_LIST.reduce((o, k) => ({ ...o, [k]: 1 }), {});
    const values = {
      valid: apps,
      invalid: {
        ...apps,
        [C.APPS.APP_2]: null,
      },
    };
    expect(validate(values).valid).not.toBeDefined();
    expect(validate(values).invalid).toBeDefined();
  });
});
