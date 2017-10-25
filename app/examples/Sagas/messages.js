/* eslint-disable quotes */
export default {
  header: 'Sagas Example',
  desc: [
    `This example is using redux-sagas to fetch async data (for example from an API).`,

    `It uses redux, so get a good understanding of the 'Redux' example first.`,

    `It follows the following flow:`,
    ` - 'exampleSaga' (saga.js) waits for a redux action to be dispatched`,
    ` - when 'exampleSaga' sees that the correct action has been dispatched, call 'exampleSagaWorker' (saga.js)`,
    ` - 'exampleSagaWorker' calls the example API`,
    ` - when the API call returns, place its results in the redux store`,
    ` - the component notices a change in the redux store and updates`,
  ],
};
