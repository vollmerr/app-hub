export const dateWithoutTime = (date) => {
  if (date && !isNaN(new Date(date))) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  return undefined;
};
