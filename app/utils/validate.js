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

export const isEmptyChecks = (value) => (
  !value || typeof value !== 'object' || !value.length
    ? 'Required'
    : undefined
);

export const isEmptyFile = (value) => (
  !value || typeof value !== 'object' || !value.name
    ? 'Required'
    : undefined
);
