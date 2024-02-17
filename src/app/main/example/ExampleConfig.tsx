import { lazy } from 'react';
import createPageConfig from 'src/app/utils/handlers/createPageConfig';

const Example = lazy(() => import('./Example'));

const ExampleConfig = createPageConfig({
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'example',
      children: [
        {
          element: <Example />,
          path: '',
          title: 'example',
        },
        {
          element: <Example />,
          path: ':id',
          title: 'id',
        },
        {
          element: <Example />,
          path: ':id/etc',
          title: 'id-etc',
        },
      ],
    },
  ],
});

export default ExampleConfig;
