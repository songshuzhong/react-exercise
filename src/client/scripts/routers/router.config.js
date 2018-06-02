import { asyncComponent } from '../utils/router';

import versionRouter from '../versions/routers';

const routes = [
  {
    path: '/',
    exact: true,
    component: asyncComponent( () => import( '../pages/portal/login' ) )
  },
  {
    path: '/register',
    component: asyncComponent( () => import( '../pages/portal/register' ) )
  },
  {
    path: '/manage',
    component: asyncComponent( () => import( '../pages/console/manage' ) )
  },
  {
    path: '/wechat',
    component: asyncComponent( () => import( '../pages/portal/wechat' ) )
  },
  {
    path: '/report',
    component: asyncComponent( () => import( '../pages/console/report' ) )
  },
  {
    path: '/versions',
    component: asyncComponent( () => import( '../pages/versions' ) )
  }
];

export default routes.concat( versionRouter );