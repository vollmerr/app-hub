import React from 'react';
import styled from 'styled-components';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { withRouter } from 'react-router';

import { validToken } from 'utils/requestWithToken';
import theme from 'utils/theme';
import Router from 'components/Router';
import LoadingMessage from 'components/Loading/LoadingMessage';

import AppHub from './AppHub';
import routes from './routes';


export const Wrapper = styled(Fabric) `
  height: 100%;
  overflow: hidden;
`;


export const Content = styled.div`
  height: calc(100% - ${theme.hub.headerHeight}px);
`;


/**
 * Routing must be separate from redux (otherwise routing breaks)
 * so AppHub and Router are in differnt files pulled in here.
 */
export class AppHubRoot extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
    this.tokenTimer = null;
  }

  componentDidMount() {
    this.handleDisplayRoutes();
  }

  handleDisplayRoutes = () => {
    if (validToken(localStorage.getItem('id_token'))) {
      clearTimeout(this.tokenTimer);
      this.setState({ isAuthenticated: true });
    } else {
      this.tokenTimer = setTimeout(this.handleDisplayRoutes, 10);
    }
  }

  render() {
    const { isAuthenticated } = this.state;

    return (
      <Wrapper>
        <AppHub routes={routes} />
        {
          isAuthenticated ?
            <Content>
              <Router routes={routes} />
            </Content> :
            <LoadingMessage />
        }
      </Wrapper>
    );
  }
}

export default withRouter(AppHubRoot);
