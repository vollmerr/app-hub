import styled, { css } from 'styled-components';

import theme from 'utils/theme';
import Section from 'components/App-Content/Section';


const Wrapper = styled(Section) `
  position: relative;
  margin: ${theme.hub.padding}px;
  ${(props) => css`
    min-height: 350px;
    height: calc(
      ${100 / props.count}vh - \
      ${theme.hub.headerHeight / props.count}px - \
      ${props.padding / props.count}px - \
      ${theme.hub.padding}px
    );

    > .ms-ScrollablePane {
      min-height: 280px;
      height: calc(
        ${100 / props.count}vh - \
        ${theme.hub.headerHeight / props.count}px - \
        ${props.padding / props.count}px - \
        ${theme.hub.padding}px - \
        ${theme.list.headerHeight}px - \
        20px
      );
    }
  `}
`;

Wrapper.defaultProps = {
  count: 1,
  padding: theme.hub.padding,
};

export default Wrapper;
