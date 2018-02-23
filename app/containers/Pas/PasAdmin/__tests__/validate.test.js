import * as C from '../../constants';
import validate from '../validate';
import { isNull } from '../../../../utils/validate';

describe('validate', () => {
  it('should set an error if employee id not set', () => {
    const values = {
      [C.MANAGE.EMPLOYEE_ID]: undefined,
      [C.MANAGE.MANAGER_ID]: 'set',
    };
    const error = isNull(values[C.MANAGE.EMPLOYEE_ID]);
    const errors = { [C.MANAGE.EMPLOYEE_ID]: error };
    expect(validate(values)).toEqual(errors);
  });
  it('should set an error if manager id not set', () => {
    const values = {
      [C.MANAGE.EMPLOYEE_ID]: 'set',
      [C.MANAGE.MANAGER_ID]: undefined,
    };
    const error = isNull(values[C.MANAGE.MANAGER_ID]);
    const errors = { [C.MANAGE.MANAGER_ID]: error };
    expect(validate(values)).toEqual(errors);
  });
  it('should set an error if both manager and employee id not set', () => {
    const values = {
      [C.MANAGE.EMPLOYEE_ID]: undefined,
      [C.MANAGE.MANAGER_ID]: undefined,
    };
    let error = isNull(values[C.MANAGE.EMPLOYEE_ID]);
    const errors = { [C.MANAGE.EMPLOYEE_ID]: error };
    error = isNull(values[C.MANAGE.MANAGER_ID]);
    errors[C.MANAGE.MANAGER_ID] = error;
    expect(validate(values)).toEqual(errors);
  });
  it('should not set an error if both manager and employee ids set', () => {
    const values = {
      [C.MANAGE.EMPLOYEE_ID]: 'a',
      [C.MANAGE.MANAGER_ID]: 'b',
    };
    let error = isNull(values[C.MANAGE.EMPLOYEE_ID]);
    const errors = { [C.MANAGE.EMPLOYEE_ID]: error };
    error = isNull(values[C.MANAGE.MANAGER_ID]);
    errors[C.MANAGE.MANAGER_ID] = error;
    expect(validate(values)).toEqual(errors);
  });
});
