import React from 'react';
// import { compose } from 'redux';

// import injectSaga from 'utils/injectSaga';
// import injectReducer from 'utils/injectReducer';
// import App from 'containers/App';
// import Wrapper from 'components/App-Content/Wrapper';
// import Router from 'components/Router';

// import routes from './routes';
// import reducer from './reducer';
// import saga from './saga';


export class SPA extends React.PureComponent {
  render() {
    return (
      // <Wrapper>
      //   {/* AppContainer -> Helmet/AppNav, change app */}
      //   <Router routes={routes} />
      // </Wrapper>
      <div> in SPa...</div>
    );
  }
}


// const withReducer = injectReducer({ key: 'spa', reducer });
// const withSaga = injectSaga({ key: 'spa', saga });


// export default compose(
//   withReducer,
//   withSaga,
// )(SPA);
export default SPA;
