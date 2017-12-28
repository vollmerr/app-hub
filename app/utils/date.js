export const formattedDate = (date) => {
  if (date && !isNaN(new Date(date))) {
    return new Date(date).toISOString().substr(0, 10);
  }
  return '';
};
