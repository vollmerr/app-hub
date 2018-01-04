import { formattedDate } from 'utils/date';

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
  (value && formattedDate(value) >= formattedDate(new Date()))
    ? undefined
    : 'A future date is required'
);

export const isEmptyChecks = (value) => (
  !value || typeof value !== 'object' || !value.size
    ? 'Required'
    : undefined
);

export const isEmptyFile = (value) => (
  !value || typeof value !== 'object' || !value.name
    ? 'Required'
    : undefined
);

export const isNull = (value) => (
  value === undefined || value === null
    ? 'Required'
    : undefined
);
