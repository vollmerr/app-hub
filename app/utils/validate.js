import { dateWithoutTime } from 'utils/date';

export const isEmptyText = (value) => (
  (typeof value !== 'string') ||
    value.match(/^\s*$/)
    ? 'Required'
    : undefined
);

export const isEmptyDate = (value) => (
  !value || isNaN(new Date(value))
    ? 'Required'
    : undefined
);

export const isFutureDate = (value) => (
  (!value || isNaN(new Date(value))) ||
  (value && dateWithoutTime(value) >= dateWithoutTime(new Date()))
    ? undefined
    : 'A future date is required'
);

export const isEmptyChecks = (value) => (
  !value || typeof value !== 'object' || !value.size
    ? 'Required'
    : undefined
);

export const isEmptyFile = (value) => (
  !value || typeof value !== 'object' || !value.get || !value.get('name')
    ? 'Required'
    : undefined
);
