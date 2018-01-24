import React from 'react';
import { CheckboxVisibility } from 'office-ui-fabric-react/lib/DetailsList';
import appPage from 'containers/App-Container/appPage';
import List from 'components/List';


const aBunchOfRows = (x) => Array(10).fill(0).reduce((o, v, i) => Object.assign(o, { [`col${i}`]: `row ${i}${x}` }, {}));
const aBunchOfItems = () => Array(500).fill(0).map((x, i) => aBunchOfRows(i));
const items = aBunchOfItems();

const columns = Object.keys(items[0]).map((key) => ({
  key,
  name: key,
  fieldName: key,
}));

const style = {
  count: 3, // render as 1/3 of screen
};

const hiddenProps = {
  items,
  columns,
  style,
  title: 'Example List with CheckboxVisibility hidden',
  checkboxVisibility: CheckboxVisibility.hidden,
};

const alwaysProps = {
  items,
  columns,
  style,
  title: 'Example List with CheckboxVisibility always',
  checkboxVisibility: CheckboxVisibility.always,
};

const onHoverProps = {
  items,
  columns,
  style,
  title: 'Example List with CheckboxVisibility onHover',
  checkboxVisibility: CheckboxVisibility.onHover,
};


export class DemoLists extends React.PureComponent {
  render() {
    return (
      <div>
        <List {...hiddenProps} />
        <List {...alwaysProps} />
        <List {...onHoverProps} />
      </div>
    );
  }
}


export default appPage(DemoLists);
