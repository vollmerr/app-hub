import panels from '../panels';


it('should contain a react component on the .component proerty for each panel', () => {
  expect(panels).toMatchSnapshot();
});
