import styled from 'styled-components';

const Content = styled.div`
  display: ${(props) => props.isOpen ? 'block' : 'none'};
  cursor: pointer;
`;

export default Content;

