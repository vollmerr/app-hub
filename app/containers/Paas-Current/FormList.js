import styled from 'styled-components';
// import ListSection from 'components/List/ListSection';
import List from 'components/List';
import theme from 'utils/theme';


const style = {
  padding: theme.form.buttonsHeight + (2 * theme.hub.padding),
};

const FormList = styled(List) `
  box-shadow: none;
  margin: 0;
`;

FormList.defaultProps = {
  style,
};


export default FormList;
