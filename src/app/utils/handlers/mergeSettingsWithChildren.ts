import { RouteConfig } from '@types-fuse/routes';
import _ from '@lodash';

export default function mergeSettingsWithChildren(routes: RouteConfig[]) {
  const routesContainer = _.cloneDeep(routes);

  recursiveMerge(routesContainer);

  return routesContainer;
}

function recursiveMerge(recursiveRoutes: RouteConfig[]) {
  recursiveRoutes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      if (route.children.some((child) => !child.settings)) {
        route.children.forEach((child) => {
          child.settings = _.merge({}, route.settings, child.settings);
        });
      }

      recursiveMerge(route.children);
    }
  });
}
