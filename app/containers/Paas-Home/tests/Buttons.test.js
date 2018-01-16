import { ActionButton } from 'office-ui-fabric-react/lib/Button';

import { testStyledComponent } from 'utils/testUtils';

import { ApproveButton, DenyButton } from '../Buttons';


testStyledComponent(ApproveButton, ActionButton);
testStyledComponent(DenyButton, ActionButton);
