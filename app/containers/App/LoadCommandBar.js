import React from 'react';
import PropTypes from 'prop-types';


/**
 * This component is used set and remove the
 * CommandBar in an app. It is a seperate component
 * to allow the componentDidMount lifecycle to trigger
 * when the component gets rendered (after the app
 * is done loading)
 */
class LoadCommandBar extends React.PureComponent {
  componentDidMount() {
    this.setCommandBar();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.disabled !== nextProps.disabled) {
      this.setCommandBar();
    }
  }

  // remove command bar on unmount
  componentWillUnmount() {
    this.props.setCommandBar(false);
  }

  setCommandBar = () => {
    const { setCommandBar, commands, disabled } = this.props;
    if (disabled) {
      // mark all buttons as disabled if disabled
      setCommandBar(commands.map((command) => ({ ...command, disabled: true })));
    } else {
      setCommandBar(commands);
    }
  }

  render() {
    return null;
  }
}


const { func, object, bool } = PropTypes;

LoadCommandBar.propTypes = {
  setCommandBar: func.isRequired,
  commands: object.isRequired,
  disabled: bool,
};


export default LoadCommandBar;
