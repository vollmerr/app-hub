import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import toJS from '../../../hocs/toJS';
import Help from '../../../components/Help';

import * as selectors from '../selectors';

import sections from './sections';


export class SpaHelp extends React.PureComponent {
  render() {
    const helpProps = {
      title: 'SPA Help',
      sections: sections(this.props.enums),
    };

    return (
      <Help {...helpProps} />
    );
  }
}


const { object } = PropTypes;

SpaHelp.propTypes = {
  enums: object.isRequired,
};


const mapStateToProps = createStructuredSelector({
  enums: selectors.getEnums,
});

const withConnect = connect(mapStateToProps);


export default compose(
  withConnect,
  toJS,
)(SpaHelp);
