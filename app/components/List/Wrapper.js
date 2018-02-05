import styled, { css } from 'styled-components';

import theme from '../../utils/theme';


const Wrapper = styled.div`
  position: relative;
  margin: ${theme.hub.padding}px;
  padding: ${theme.hub.padding}px;
  background: ${theme.white};
  box-shadow: 0 0 3px ${theme.neutralLight};


  ${(props) => css`
    min-height: 250px;
    height: calc(
      ${100 / props.count}vh - \
      ${theme.hub.headerHeight / props.count}px - \
      ${props.padding / props.count}px - \
      ${theme.hub.padding}px
    );

    > .ms-ScrollablePane {
      min-height: 180px;
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

  .ms-DetailsRow {
    color: ${theme.neutralPrimary};
  }
`;


Wrapper.defaultProps = {
  count: 1,
  padding: theme.hub.padding,
};


export default Wrapper;
