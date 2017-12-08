import { testStyledComponent } from 'utils/testUtils';

import PieChart, { Wrapper, Chart, Legend, Item, Color } from '../PieChart';

testStyledComponent(Wrapper);
testStyledComponent(Chart);
testStyledComponent(Legend);
testStyledComponent(Item);
testStyledComponent(Color); // TODO: test bg based off props

