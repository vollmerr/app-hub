import styled from 'styled-components';

import theme from '../../utils/theme';

import Link from '../Link';


const HelpLink = styled(Link) `
  color: ${theme.themePrimary};

  &:hover {
    color: ${theme.themeDarker};
    text-decoration: underline;
  }
`;


export default HelpLink;
