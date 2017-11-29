import { ACK } from 'containers/Spa/constants';

import spaFields from './fields';


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
    Object.keys(obj).filter((key) => include.includes(key)) :
    Object.keys(obj);

  return keys
    .filter((key) => !exclude.includes(key))
    .map((key) => ({
      key: obj[key].name,
      name: obj[key].label,
      fieldName: obj[key].name,
      isResizable: true,
      ariaLabel: obj[key].ariaLabel,
      minWidth: 100,
      maxWidth: 400,
    }));
}

// Columns for admin page lists
const adminExcludes = [ACK.STATEMENT, ACK.DETAILS, ACK.FILE_CONTENT];
export const adminColumns = mapToColumns(spaFields, [], adminExcludes);
// columns for home page
const homePendingIncludes = [ACK.TITLE, ACK.DATE_START, ACK.DATE_END];
export const homePendingColumns = mapToColumns(spaFields, homePendingIncludes);

const homePreviousIncludes = [...homePendingIncludes];
export const homePreviousColumns = mapToColumns(spaFields, homePreviousIncludes);
