import React from 'react';

import HelpLink from '../../../components/Help/HelpLink';

import * as C from '../constants';


export default [
  {
    title: 'Managing Staff Authorizations',
    roles: [C.ROLES.MANAGER],
    desc: (
      <div>
        <p>Authorizations for current employees can be viewed and edited on the <HelpLink to={'/pas/current'}>Current Staff Authorizations</HelpLink> page. Only managers have access to this page. Authorizations marked yellow indicate that the employee has neither been approved nor denied authorization and action is required. When authorizing employees marked yellow, all applications must be approved or denied before submitting.</p>
        <p>An employees authorizations can be changed to denied or approved by following the following steps:</p>
        <ul>
          <li>Change the authorization to <b>Yes</b> or <b>No</b> for each application by clicking on the applications toggle; or change all applications at once by clicking <b>All</b>.</li>
          <li>Click <b>Submit</b> to finalize any changes made.</li>
        </ul>

        <p>Authorizations for previous employees can be viewed on the <HelpLink to={'/pas/previous'}>Previous Staff Authorizations</HelpLink> page. These authorizations are for historical purposes only, and cannot be edited.</p>
      </div>
    ),
  },
  {
    title: 'Viewing Reports',
    roles: C.ROLES_VALUES,
    desc: (
      <div>
        <p>Reports for current and previous staff authorizations can be viewed on the <HelpLink to={'/pas/report'}>Reports</HelpLink> page.</p>
        <ul>
          <li>Select <b>All Approved</b>, <b>All Denied</b>, or <b>Pending</b> in the pie chart legend to toggle the list of authorizations being displayed.</li>
          <li>Select the <b>Authorization Year</b> filter to display only authorizations for that year.</li>
          <li>Click <b>Download CSV</b> to export a csv file of the currently visible data.</li>
        </ul>

        <p>Authorizations for previous employees can be viewed on the <HelpLink to={'/pas/previous'}>Previous Staff Authorizations</HelpLink> page. These authorizations are for historical purposes only, and cannot be edited.</p>
      </div>
    ),
  },
  {
    title: 'Assigning Temporary Managers',
    roles: [C.ROLES.SECURITY],
    desc: (
      <div>
        <p>Employees without managers can be temporarily assigned one using the <HelpLink to={'/pas/admin'}>Admin</HelpLink> page. Only members of the <b>{C.ROLES.SECURITY}</b> AD group have access to this page.</p>

        <p>To temporarily assign a manager to an employee:</p>
        <ul>
          <li>Select the employee from the <b>No Manager</b> list, or from the <b>Assigned Manager</b> list for employees that already have a manager assigned.</li>
          <li>Select the temporary manager from the <b>Manager</b> dropdown.</li>
          <li>Click <b>Submit</b> to finish.</li>
        </ul>
      </div>
    ),
  },
];
