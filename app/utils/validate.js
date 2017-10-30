export const isEmptyText = (value) => (
  (typeof value !== 'string') ||
    value.match(/^\s*$/)
    ? 'Required'
    : undefined
);
