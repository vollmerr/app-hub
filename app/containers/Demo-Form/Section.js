import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AppSection from 'components/App-Content/Section';


const Wrapper = styled(AppSection)`
  flex: 30%;
  min-width: 300px;
  margin: 5px;
`;


export class Section extends React.PureComponent {
  render() {
    const { title, allNames, byName } = this.props;

    return (
      <Wrapper>
        <h3>{title}</h3>
        {
          // loop through field names for section (in order specified)
          allNames.map((name) => {
            // pull out component from other props (must be capitalized so rename to 'C')
            const { component: C, ...props } = byName[name];
            // render individual field with props (required, label, etc)
            return (
              <C {...props} key={name} />
            );
          })
        }
      </Wrapper>
    );
  }
}


const { object, array, string } = PropTypes;

Section.propTypes = {
  title: string.isRequired,
  allNames: array.isRequired,
  byName: object.isRequired,
};

export default Section;
