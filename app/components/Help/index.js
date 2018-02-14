import React from 'react';
import PropTypes from 'prop-types';

import LayoutSection from '../Layout/Section';

const Section = ({ title, desc }) => (
  <LayoutSection>
    <h2>{title}</h2>
    <div>{desc}</div>
  </LayoutSection>
);

class Help extends React.PureComponent {
  render() {
    const { title, sections } = this.props;

    return (
      <div>
        <LayoutSection>
          <h1>{title}</h1>
        </LayoutSection>
        {
          sections.map((section) => (
            <Section key={section.title} {...section} />
          ))
        }
      </div>
    );
  }
}


const { string, array, node } = PropTypes;


Section.propTypes = {
  title: string.isRequired,
  desc: node.isRequired,
};

Help.propTypes = {
  title: string.isRequired,
  sections: array.isRequired,
};

export default Help;
