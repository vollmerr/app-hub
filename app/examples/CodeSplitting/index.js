/**
 *
 * CodeSplitting
 *
 * This example demonstrates how to perform code splitting.
 * It imports the ComponentToLoad component after it has loaded.
 */

import React from 'react';

import Example from 'examples/common/Example';

/**
 * Load the component async through the 'Loadable.js' file that is created
 * when you select 'y' for 'load resources async' in the generator
 */
import ComponentToLoad from './Loadable';
import messages from './messages';

class CodeSplitting extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Example header={messages.header} desc={messages.desc}>
        <ComponentToLoad />
      </Example>
    );
  }
}

export default CodeSplitting;
