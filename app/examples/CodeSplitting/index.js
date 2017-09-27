/**
 *
 * CodeSplitting
 *
 * This example demonstrates how to perform code splitting.
 * It imports the ComponentToLoad component after it has loaded.
 */

import React from 'react';

import Example from 'examples/common/Example';

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
