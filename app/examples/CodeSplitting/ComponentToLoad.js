/**
*
* ComponentToLoad
*
*/

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 60px;
  margin: auto;
  text-align: center;
  border: 1px solid #d6d6d6;
`;

function ComponentToLoad() {
  return (
    <Wrapper>
      This is the loaded component.
    </Wrapper>
  );
}

export default ComponentToLoad;
