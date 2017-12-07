import 'whatwg-fetch';


/**
 * Downloads a file
 *
 * @param  {object} file    - File to download
 * @param  {string} name    - Name to save file as
 */
export /* istanbul ignore next */ function downloadFile(file, name) {
  // make into blob and save
  const a = document.createElement('a');
  const data = [file];
  const blob = new Blob(data, { type: 'octet/stream' });

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
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
export function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}


/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

export default request;
