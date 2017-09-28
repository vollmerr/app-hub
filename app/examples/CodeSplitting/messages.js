/**
 *
 * text to display in  CodeSplitting component
 *
 */
/* eslint-disable quotes */
export default {
  header: 'Code Splitting Example',
  desc: [
    `This is the container that loads the component. After this is first loaded the component to the right is then loaded as a seperate 'chunk'.`,

    `This allows us to not have to pull in the entire project on the first load, but instead only pull in components as needed.`,

    `Open the Network tab of the console to see the different '.chunk.js' files being loaded.`,

    `This will generally be done on route changes.`,

    `When generating a new component (npm run generate) select 'y' for 'load resources async' to add the 'Loadable.js' file to that component, then import that file elsewhere.`,
  ],
};
