/**
 * Formats an item object to the correct format
 * for rendering
 *
 * @param {array} item      - item to format
 * @param {string} name     - internal field name for lookup
 * @param {object} field    - field format info
 * @param {object} enums    - display names for enums
 *
 * @return {string}         - formatted item
 */
export function formatItem(item, name, field, enums = {}) {
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
}

/**
 * Formats an array of item objects to the correct format
 * for rendering
 *
 * @param {array} items     - items to format
 * @param {object} fields   - lookup table of fields
 * @param {object} enums    - display names for enums
 *
 * @return {array}          - formatted items as objects of strings
 */
export function formatItems(items, fields, enums) {
  const formattedItems = [];

  items.forEach((item, i) => {
    formattedItems[i] = {};
    Object.keys(item).forEach((k) => {
      formattedItems[i][k] = formatItem(item, k, fields[k], enums);
    });
  });

  return formattedItems;
}

/**
 * Maps a object to the format Office-UI-Fabric-React DetailsList`s expect
 *
 * @param {object} obj    - object to map
 * @param {array} include - keys to include, if empty includes all
 * @param {array} exclude - keys to exclude
 *
 * @return {object}       - mapped object to use in List
 */
export function mapToColumns(obj, include = [], exclude = []) {
  const keys = include.length ?
    include :
    Object.keys(obj);

  return keys
    .filter((key) => !exclude.includes(key))
    .map((key) => ({
      key: obj[key].name,
      name: obj[key].label,
      fieldName: obj[key].name,
      isResizable: true,
      ariaLabel: obj[key].ariaLabel,
      minWidth: obj[key].minWidth || 100,
      maxWidth: obj[key].maxWidth || 200,
      data: obj[key].data || {},
    }));
}
