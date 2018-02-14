import React from 'react';
import styled from 'styled-components';

import Link from '../../../components/Link';


const Desc = styled.div`
  padding: 0 0 15px 15px;
`;


export default [
  {
    name: 'The Badge Access Request System (BARS) is now live!',
    date: '2017/10/08',
    href: 'http://bars.technology.ca.gov/',
    desc: (
      <Desc>
        <p>This system allows users to easily apply for ODI access badges. It replaces the old paper form for an entirely online experience, and provides features including email reminders and alerts, automatic workflow, and record history.</p>
        <p>Get started today at <Link href={'http://bars.technology.ca.gov/'}>http://bars.technology.ca.gov</Link>.</p>
      </Desc>
    ),
  },
  {
    name: 'Initial release of the ODI App Hub',
    date: '2017/10/08',
    to: '/',
    desc: (
      <Desc>
        <p>We are proud to announce the release of the ODI App hub; a central location for ODI internal applications.</p>
        <p>It is built using the latest technologies such as React, Webpack, Node, and .Net Core 2</p>
      </Desc>
    ),
  },
];
