import { ACK } from 'containers/Spa/constants';

import validate from '../validate';


describe('validate', () => {
  it('should make sure the end date is after the start date', () => {
    let actual = validate({
      [ACK.START_DATE]: '12/09/2020',
      [ACK.END_DATE]: '01/04/2017',
    });
    expect(actual).not.toEqual({});
    // end after start, no error
    actual = validate({
      [ACK.START_DATE]: '12/09/2011',
      [ACK.END_DATE]: '01/04/2017',
    });
    expect(actual).toEqual({});
  });

  it('should make sure there is an attachment if there is a file name', () => {
    // name but no attachment
    let actual = validate({
      [ACK.FILE_NAME]: 'test name',
    });
    expect(actual).not.toEqual({});
    // attachment but no name
    actual = validate({
      [ACK.FILE_CONTENT]: 'test content',
    });
    expect(actual).not.toEqual({});
    // has both, no errors
    actual = validate({
      [ACK.FILE_NAME]: 'test name',
      [ACK.FILE_CONTENT]: 'test content',
    });
    expect(actual).toEqual({});
  });
});
