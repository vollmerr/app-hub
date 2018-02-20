import React from 'react';

import HelpLink from '../../../components/Help/HelpLink';

import * as C from '../constants';


export default (enums) => {
  const draft = enums[C.ACK.STATUS][C.STATUS.DRAFT];
  const pending = enums[C.ACK.STATUS][C.STATUS.PENDING];
  const active = enums[C.ACK.STATUS][C.STATUS.ACTIVE];
  // const canceled = enums[C.ACK.STATUS][C.STATUS.CANCELED];
  const deactived = enums[C.ACK.STATUS][C.STATUS.DEACTIVATED];
  const expired = enums[C.ACK.STATUS][C.STATUS.EXPIRED];

  return [
    {
      title: 'Acknowledging a Pending Policy',
      desc: (
        <div>
          <p>Policies can be acknowledged on the <HelpLink to={'/spa/home'}>Home Page</HelpLink> by using the following steps:</p>
          <ul>
            <li>Select the policy to acknowledge from the <b>Pending Acknowledgments</b> list.</li>
            <li>Read the details of the policy in the modal window.</li>
            <li>If there is an attached document, it must be downloaded and read by clicking <b>Download</b>.</li>
            <li>When finished reading the details and attached document, read and confirm the acknowledgment statement.</li>
            <li>Complete the acknowledgment of the policy by clicking <b>Submit</b>.</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Viewing a Previous Policy Acknoweldgment',
      desc: (
        <div>
          <p>Previous policies and their acknowledgments can be viewed on the <HelpLink to={'/spa/home'}>Home Page</HelpLink> by using the following steps:</p>
          <ul>
            <li>Select the policy to view from the <b>Previous Acknowledgments</b> list.</li>
            <li>The details of the policy will be displayed in the modal window.</li>
            <li>If there is an attached document, it may be downloaded by clicking <b>Download</b>.</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Managing Policies',
      roles: [C.ROLES.ADMIN, ...C.TEST_ROLES_VALUES],
      desc: (
        <div>
          <p>Policies can be managed and viewed on the <HelpLink to={'/spa/admin'}>Admin</HelpLink> page. Only administraitive roles have access to this page.</p>

          <p>Selecting a policy in the <b>{active}</b>, <b>{deactived}</b>, or <b>{expired}</b> status from one of the lists will provide details about the policy. From within this detailed view:</p>
          <ul>
            <li>Select <b>Pending</b> or <b>Acknowledged</b> in the pie chart legend to toggle the <b>Pending Recipients</b> or <b>Acknowledged Recipients</b> list being displayed.</li>
            <li>A CSV export of the currently visisble recipients can be downloaded by clicking <b>Download</b> in the top command bar.</li>
            <li>Policies that are in the <b>{active}</b> status can be deactivated by clicking <b>Deactivate</b> in the top command bar. It is not possible to reactive a policy once it has been deactivated.</li>
          </ul>

          <p>Selecting a policy in the <b>{draft}</b> status from the list will allow editing the policy. From this view the policy may also be canceled by clicking <b>Cancel</b> from the command bar, or submitted by clicking <b>Submit</b>. Any members of the creators AD group will also be able to edit, cancel, or submit this policy.</p>

          <p>After a policy has been submitted Policies in the <b>{pending}</b> status cannot be modified or canceled..</p>
        </div>
      ),
    },
    {
      title: 'Creating a New Policy',
      roles: [C.ROLES.ADMIN, ...C.TEST_ROLES_VALUES],
      desc: (
        <div>
          <p>Policies can be created on the <HelpLink to={'/spa/admin'}>Admin</HelpLink> page. Only administraitive roles have access to this page. To create a new policy:</p>
          <ul>
            <li>Select <b>New</b> from the command bar.</li>
            <li>Fill out the <b>New Policy Acknowledgment</b> from. Adding an attached document is optional.</li>
            <li>To save as a draft, allowing editing at a later time by any member of the creators AD group, click <b>Save Draft</b>.</li>
            <li>To submit the policy, click <b>Submit</b>.</li>
          </ul>

          <p><b><em>Submitting a policy will generate emails for all members of the Target Groups selected. Make sure the policy information is correct and the correct Target Groups are selected before submitting.</em></b></p>
        </div>
      ),
    },
  ];
};
