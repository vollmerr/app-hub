/**
 *
 * Redux
 *
 * It is recommended to use the Redux Dev Tool chrome extension when running this.
 *
 * This example demonstrates:
 *  - redux     => state management
 *  - actions   => functions that gets called to update the redux store
 *  - reducer   => handles how the redux store should be updated based off the action called
 *  - selectors => used to select a specific slice of the redux store's state
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; // connects react to the redux store
import { createStructuredSelector } from 'reselect'; // for creating selectors (to get specific piece of redux store)
import { compose } from 'redux';

import Example from 'examples/common/Example';

import injectReducer from 'utils/injectReducer'; // Utility for React-Boilerplate for injecting reducers. Required if using code-splitting.
import makeSelectExampleData from './selectors'; // selectors get a specific piece of redux store
import reducer from './reducer'; // reducers are how the store gets updated based off actions
import { exampleAction } from './actions'; // actions are what you call when you want to update the redux store.
import messages from './messages';
import Input from './Input';

// Exported by name, not connected to redux for testng purposes
export class Redux extends React.PureComponent {
  /**
   * Updates the redux store when use enters data into the input field.
   * @param {event} event   - onChange event for input
   */
  handleUpdateData = (event) => {
    // Get the value form the input
    const data = event.target.value;
    // use the action we passed into 'mapDispatchToProps' to
    // update the redux store. note the action is in the 'this.props' object
    this.props.onExampleAction(data);
  }

  render() {
    const { exampleData } = this.props; // this makes 'exampleData' a reference to 'this.props.exampleData'

    return (
      <Example header={messages.header} desc={messages.desc}>
        <Input placeholder={'Enter some text'} onChange={this.handleUpdateData} />
        {exampleData && <p>{exampleData}</p>}
      </Example>
    );
  }
}

/**
 * This defines the types (string, func, number, etc)
 * that the component is expecting. These are passed to
 * our props from 'mapStateToProps' and 'mapDispatchToProps'
 * when 'connect' is called.
 */
Redux.propTypes = {
  onExampleAction: PropTypes.func.isRequired,
  exampleData: PropTypes.string,
};

/**
 * This will be any slice of the redux store you are
 * wanted to use. We are using a selector (from selectors.js)
 * to extract the exact part of the state we want. How this
 * slice of state is updated is defined in 'reducer.js'
 */
const mapStateToProps = createStructuredSelector({
  exampleData: makeSelectExampleData(),
});

/**
 * This will be any actions to update the redux store.
 * They are defined in
 */
export function mapDispatchToProps(dispatch) {
  return {
    onExampleAction: (data) => dispatch(exampleAction(data)),
  };
}

/**
 * Add redux's connection to the store, passing in the state we
 * want out of the store and actions we may want to take.
 */
const withConnect = connect(mapStateToProps, mapDispatchToProps);

/**
 * If we are loading our container dynamically using code-splitting
 * (which we are almost always be doing), then we must inject our
 * reducers into the store.
 *
 * The 'key' will be our slice of state in the redux store that is
 * associated to the reducer we are injecting, and the 'reducer'
 * will be the redcuer we want to inject (imported at the top).
 */
const withReducer = injectReducer({ key: 'redux', reducer });

/**
 * Combine our injected reducers with redux's connect functionality.
 *
 * IMPORTANT NOTE! YOU CANNOT USE REACT-ROUTER / HAVE ROUTES DECLARED
 * ON A COMPONENT THAT IS CONNECTED (or atleast for the current version
 * we are using). IT MUST BE JUST 'export default <name>' IF DECLARING ROUTES.
 */
export default compose(
  withReducer,
  withConnect,
)(Redux);
