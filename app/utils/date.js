export const formattedDate = (date) => {
  if (date && !isNaN(new Date(date))) {
    return new Date(date).toISOString().substr(0, 10);
  }
  return '';
};


export const daysToMs = (numDays) => (
  numDays * 1000 * 60 * 60 * 24
);
