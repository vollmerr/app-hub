import styled, { css } from 'styled-components';

import theme from '../../utils/theme';

import Section from '../Layout/Section';


const Wrapper = styled(Section)`
  position: relative;
  padding: ${theme.hub.padding}px;

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
