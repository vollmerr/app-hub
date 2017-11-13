import { createAction } from 'redux-actions';

import {
  EXAMPLE_ACTION,
} from './constants';


/**
 * purpose:
 *  generate an action to dispatch to redux
 *
 * output:
 *  {
 *    type: EXAMPLE_ACTION,
 *    payload: data,
 *  }
 *
 * git:
 *  https://github.com/reduxactions/redux-actions
 *
 * error handling:
 *  if action would return an Error object (ex from api call)
 *  would also provide `error: true` and `payload` is error in output.
 *
 * naming:
 *  name the same as constant passed in camelCase. For example if instead
 *  of `EXAMPLE_ACTION` it was `CALL_API_REQUEST`, name the action
 * `callApiRequest` instead of `exampleAction`
 */
export const exampleAction = createAction(EXAMPLE_ACTION);
