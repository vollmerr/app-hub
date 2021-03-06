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
  !value || !Array.isArray(value) || !value.length
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

export const unauthorizedRoute = (route, roles = []) => (
  !route ||
  !Object.keys(route).length ||
  Boolean(
    route.roles &&
    !route.roles.some((role) => roles.includes(role))
  )
);
