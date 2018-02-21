import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import toJS from '../../hocs/toJS';
import theme from '../../utils/theme';
import * as selectors from '../../containers/AppHub/selectors';

import LayoutSection from '../Layout/Section';

import HelpSection from './HelpSection';


export const Wrapper = styled(LayoutSection) `
  padding: ${theme.hub.padding}px;
  min-height: calc(100vh - ${theme.hub.headerHeight}px - ${2 * theme.hub.padding}px);
`;


export const Title = styled.h1`
  margin: 0;
`;


class Help extends React.PureComponent {
  render() {
    const { title, sections, roles } = this.props;

    return (
      <Wrapper>
        <Title>{title}</Title>
        {
          sections.map((section) => {
            // section has specific roles defined
            if (section.roles) {
              // do not render if user does not have roles
              if (!section.roles.some((role) => roles.includes(role))) {
                return null;
              }
            }

            return (
              <HelpSection key={section.title} {...section} />
            );
          })
        }
      </Wrapper>
    );
  }
}


const { string, array } = PropTypes;

Help.propTypes = {
  roles: array,
  title: string.isRequired,
  sections: array.isRequired,
};

Help.defaultProps = {
  roles: [],
};


const mapStateToProps = createStructuredSelector({
  roles: selectors.getUserRoles,
});

const withConnect = connect(mapStateToProps);


export default compose(
  withConnect,
  toJS,
)(Help);
