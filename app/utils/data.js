export const renderItem = (item, name, field, enums = {}) => {
  let content = item[name];
  // convert all data to array for mapping over
  if (!Array.isArray(content)) {
    content = [content];
  }
  // go through each item, mapping to the correct format
  content = content.map((x) => {
    // is enum mapping
    if (enums[name]) {
      return enums[name][x];
    }
    // is date
    if (field.data && field.data.type === 'DATE') {
      return isNaN(Date.parse(x)) ? '' : new Date(x).toISOString().substr(0, 10);
    }
    return x;
  });
  // join them back as string seperated by commas
  return content.join(', ');
};
