import { asyncComponent } from '../utils/router';

const routes = [
  {
    path: '/16_4/event',
    exact: true,
    component: asyncComponent( () => import( './16_4/event' ) )
  },
  {
    path: '/16_4/life/cycle',
    exact: true,
    component: asyncComponent( () => import( './16_4/lifeCycle' ) )
  }
];

export { routes };
export default routes;