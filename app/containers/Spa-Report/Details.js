import React from 'react';
import styled from 'styled-components';

import theme from 'utils/theme';


const Wrapper = styled.div`
  flex: 1;
  margin: 5px;
  padding: 15px;
  background: ${theme.white};
  box-shadow: 0 0 3px ${theme.neutralLight};
`;


const Heading = styled.h3`
  margin: 0;
`;


class Details extends React.PureComponent {
  render() {
    const { title } = this.props;

    return (
      <Wrapper>
        <Heading>{title}</Heading>
        todo: details...
      </Wrapper>
    );
  }
}

export default Details;
