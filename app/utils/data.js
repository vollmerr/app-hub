import { fromJS, Set, Map } from 'immutable';


export const types = {
  date: 'date',
};


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
    if (field && field.data && field.data.type === types.date) {
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
export function formatList(items, fields, enums) {
  const formattedList = [];
  items.forEach((item, i) => {
    formattedList[i] = {};
    Object.keys(item).forEach((k) => {
      formattedList[i][k] = formatItem(item, k, fields[k], enums);
    });
  });
  return formattedList;
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
      notSortable: obj[key].notSortable || false,
      isSortedDescending: obj[key].isSortedDescending || undefined,
    }));
}


/**
 * Downloads a file
 *
 * @param  {object} file    - File to download
 * @param  {string} name    - Name to save file as
 */
export /* istanbul ignore next */ function downloadFile(file, name, type = 'octet/stream') {
  // make into blob and save
  const a = document.createElement('a');
  const data = [file];
  const blob = new Blob(data, { type });

  document.body.appendChild(a);
  // IE...
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, name);
  } else {
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}


/**
 * Maps an array of objects into { byId: [], allIds: {} }
 *
 * @param {array} arr       - array to normalize
 * @param {string} key      - key to use identifier
 *
 * @return {object} byId    - mapped items by id
 * @return {array} allIds   - ids of all objects, in order
 */
export const normalizeById = (arr, key = 'id') => {
  const byId = arr.reduce((acc, cur) => {
    acc[String(cur[key])] = cur;
    return acc;
  }, {});
  const allIds = Object.keys(byId);
  return { byId, allIds };
};


/**
 * Maps an and merges array of objects into { byId: [], allIds: {} }
 * Merges into an immutable existing byId and allIds
 *
 * @param {Map} state         - immutable state object to update
 * @param {string} section    - section of immutable state to update
 * @param {array} data        - data to map to byId/allIds
 * @param {string} id         - id to use as key for iteration
 *
 * @return {Map} byId         - mapped and merged items by id
 * @return {List} allIds      - ids of all objects, in order
 */
export const mergeById = (state, section, data, id = 'id') => {
  const { byId, allIds } = normalizeById(data, id);

  return Map({
    byId: state.getIn([section, 'byId']).merge(fromJS(byId)),
    allIds: state.getIn([section, 'allIds']).toSet().union(Set(allIds)).toList(),
  });
};
