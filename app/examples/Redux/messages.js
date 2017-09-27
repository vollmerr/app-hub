/**
 *
 * text to display in  WithRedux component
 *
 */
/* eslint-disable quotes */
export default {
  header: 'Redux Example',
  desc: [
    `This example is using redux.`,

    `It is recommended to use the Redux Dev Tools for chrome to see the redux store change
    (both in this example and while developing...).`,

    `Enter some text into the input field below. The text is updated from the redux store.
    Then try navigating to another example and back, notice the input's state does not persist,
    but the redux store's state does.`,

    `Redux also allows us to easily access state accross different components, and
    should only be used in container components (ones that have logic, etc...)`,

    `Redux should only be used in container components. When generating a new component
    (npm run generate) select 'y' for 'Do you want an actions/constants/selectors/reducer
    tuple for this container?'`,

    `NOTE: Do not use redux in a container that has routing declared, it currently breaks it!`,
  ],
};
