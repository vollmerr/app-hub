import AppHubHome from 'containers/AppHub-Home/Loadable';
import SpaHome from 'containers/Spa-Home/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

const routes = {
  home: {
    path: '/',
    text: 'AppHub Home',
    exact: true,
    component: AppHubHome,
  },
  spa: {
    path: '/spa',
    text: 'Spa',
    exact: true,
    component: SpaHome,
  },
};

export const notFound = NotFoundPage;

export default routes;
