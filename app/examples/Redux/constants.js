/**
 * purpose:
 *  This constant will be used throughout the app for a specific action.
 *  By naming it in this single place it reduces typo errors, and allows
 *  actions dispatched to redux with this name to be easily identified.
 *
 *  With redux we use the same string in multiple places such as in this
 *  example the `EXAMPLE_ACTION` is used in both 'actions.js' and 'reducer.js'
 *
 * naming:
 *  name constants with 'app/<container name>/<constant name>'
 *  for example `CALL_API_REQUEST` in 'app/containers/Demo-App'
 *  would be 'app/Demo-App/CALL_API_REQUEST'
 */
export const EXAMPLE_ACTION = 'app/Redux/EXAMPLE_ACTION';
