import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Left = styled.div`
  padding: 15px;
  flex: 1;
`;

const Right = styled.div`
  padding: 15px;
  flex: 1;
`;

const Example = ({
  header,
  desc,
  children,
}) => (
  <Wrapper>
    <Helmet>
      <title>{header}</title>
    </Helmet>
    <Left>
      <h1>{header}</h1>
      {
        desc.map((x, i) => <p key={i}>{x}</p>) // eslint-disable-line react/no-array-index-key
      }
    </Left>
    <Right>
      {children}
    </Right>
  </Wrapper>
);

Example.propTypes = {
  header: PropTypes.string.isRequired,
  desc: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node,
};

export default Example;
