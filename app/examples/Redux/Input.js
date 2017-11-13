import styled from 'styled-components';

/**
 * This is using `styled-components` to style
 * a component. It is essentially putting css into
 * out javascript.
 *
 * We also have access to the props passed in, for
 * example we can style the color `red` if
 * `props.disabled` is passed by:
 *
 * color: ${props => propd.disabled ? 'red' : 'black'}
 */
const Input = styled.input`
  padding: 15px;
  background: #efefef;
  border: 1px solid #ddd;
  width: 100%;
`;

export default Input;
