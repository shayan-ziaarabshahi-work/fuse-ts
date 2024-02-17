import { lazy } from 'react';
import createPageConfig from 'src/app/utils/handlers/createPageConfig';

const Home = lazy(() => import('./Home'));

const HomeConfig = createPageConfig({
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '',
      children: [
        {
          element: <Home />,
          path: '',
          title: 'home',
        },
        {
          element: <Home />,
          path: ':id',
          title: 'id',
        },
        {
          element: <Home />,
          path: ':id/etc',
          title: 'id-etc',
        },
      ],
    },
  ],
});

export default HomeConfig;
