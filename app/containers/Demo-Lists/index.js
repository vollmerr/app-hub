import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CheckboxVisibility } from 'office-ui-fabric-react/lib/DetailsList';

import appPage from 'containers/App-Container/appPage';
import Content from 'components/App-Content/Content';
import List from 'components/List';
import ListSection from 'components/List/ListSection';

const aBunch = 5;
const aBunchOfRows = (x) => Array(aBunch).fill(0).reduce((o, v, i) => Object.assign(o, { [`col${i}`]: `row ${i}${x}` }, {}));
const aBunchOfItems = () => Array(aBunch).fill(0).map((x, i) => aBunchOfRows(i));

const columns = Object.keys(aBunchOfItems()[0]).map((key) => ({
  key,
  name: key,
  fieldName: key,
}));

const hiddenProps = {
  columns,
  title: 'Example List with CheckboxVisibility hidden',
  items: aBunchOfItems(),
  checkboxVisibility: CheckboxVisibility.hidden,
};

const alwaysProps = {
  columns,
  title: 'Example List with CheckboxVisibility always',
  items: aBunchOfItems(),
  checkboxVisibility: CheckboxVisibility.always,
};

const onHoverProps = {
  columns,
  title: 'Example List with CheckboxVisibility onHover',
  items: aBunchOfItems(),
  checkboxVisibility: CheckboxVisibility.onHover,
};

const oneThird = {
  vh: 33,
  margin: -15,
};

export class DemoLists extends React.PureComponent {
  render() {
    return (
      <Content>
        <ListSection {...oneThird}>
          <List {...hiddenProps} />
        </ListSection>
        <ListSection {...oneThird}>
          <List {...alwaysProps} />
        </ListSection>
        <ListSection {...oneThird}>
          <List {...onHoverProps} />
        </ListSection>
      </Content>
    );
  }
}


const { func } = PropTypes;

DemoLists.propTypes = {
  dispatch: func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withAppPage = appPage(DemoLists);

export default connect(null, mapDispatchToProps)(withAppPage);
