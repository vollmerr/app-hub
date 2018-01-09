/**
 * Normalize fields here, such as phone numbers etc
 */

// converts number to 'project number' of ####-###
export const normalizeNumber = (value) => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, '');

  if (onlyNums.length <= 3) {
    return onlyNums;
  }

  if (onlyNums.length === 4) {
    return `${onlyNums}-`;
  }

  return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 7)}`;
};
