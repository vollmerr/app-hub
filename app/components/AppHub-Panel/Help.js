/**
*
* Help
*
*/

import React from 'react';
import styled from 'styled-components';
import Wrapper from './Wrapper';

import HelpItem from './HelpItem';

export const links = [
  {
    key: 'conditionsOfUse',
    name: 'Conditions of Use',
    href: 'http://www.ca.gov/Use',
  },
  {
    key: 'privacyPolicy',
    name: 'Privacy Policy',
    href: 'http://www.ca.gov/Privacy',
  },
  {
    key: 'accessibility',
    name: 'Accessibility',
    href: 'http://www.ca.gov/Accessibility',
  },
  {
    key: 'contactUs',
    name: 'Contact Us',
    href: 'https://cdt.ca.gov/support/',
  },
];

export const Items = styled.ul`
  padding: 0;
  margin: 0;
`;

class Help extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <h2>Help</h2>
        <hr />
        <Items>
          {
            links.map((link) => <HelpItem key={link.key} href={link.href}>{link.name}</HelpItem>)
          }
        </Items>
      </Wrapper>
    );
  }
}

Help.propTypes = {

};

export default Help;
