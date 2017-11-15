/**
 * Normalize fields here, such as phone numbers etc
 */

// converts number to 'project number' of ####-###
export const normalizeNumber = (value, previousValue) => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, '');

  if (!previousValue || value.length > previousValue.length) {
    if (onlyNums.length === 4) {
      return `${onlyNums}-`;
    }
  }

  if (onlyNums.length <= 4) {
    return `${onlyNums}`;
  }

  return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 7)}`;
};
