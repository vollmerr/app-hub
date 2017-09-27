import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import styled from 'styled-components';

import Example from 'examples/common/Example';
import Button from 'examples/common/Button';

import messages from './messages';
import Redux from './Redux/Loadable';
import Sagas from './Sagas/Loadable';

// already a Loadable.js for code splitting example, so to doing here...
export const CodeSplitting = Loadable({
  loader: () => import('./CodeSplitting'),
  loading: () => null,  // This would be a loading component
});

// Example styles
const ExamplesWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const NavWrapper = styled.div`
  display: flex;
  background: #f3f3f3;
  border-bottom: 1px solid #ddd;
  width: 100%;
  margin-bottom: 50px;
`;

const LinkButton = Button.withComponent(Link);
const StyledLink = styled(LinkButton) `
  flex: 1;
`;

// Example components
const ExamplesHome = () => (
  <Example header={messages.header} desc={messages.desc} />
);

const ExamplesNav = () => (
  <NavWrapper>
    {
      Object.values(routes).map((route) => (
        <StyledLink key={route.to} to={route.to}>{route.text}</StyledLink>
      ))
    }
  </NavWrapper>
);

// Example routes
const routes = {
  home: {
    to: '/',
    text: 'Home',
    component: ExamplesHome,
  },
  codeSplitting: {
    to: '/code-splitting',
    text: 'Code Splitting',
    component: CodeSplitting,
  },
  redux: {
    to: '/redux',
    text: 'Redux',
    component: Redux,
  },
  sagas: {
    to: '/sagas',
    text: 'Sagas',
    component: Sagas,
  },
};

export default function Examples() {
  return (
    <ExamplesWrapper>
      <ExamplesNav />
      <Switch>
        {
          Object.values(routes).map((route) => (
            <Route exact key={route.to} path={route.to} component={route.component} />
          ))
        }
      </Switch>
    </ExamplesWrapper>
  );
}
