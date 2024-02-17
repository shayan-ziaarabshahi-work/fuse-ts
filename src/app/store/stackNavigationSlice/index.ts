import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RouteConfig, StackRouteConfig } from '@types-fuse/routes';
import { stackRouteHandler } from './utils/routes';
import { RootStore } from '..';
import _ from '@lodash';

type SetStackPayloadType = StackRouteConfig;
type InitialStackPayloadType = { routes: RouteConfig[]; pathname: string };

interface InitialStateType {
  stacks: StackRouteConfig[] | null;
  preReservedStacks: StackRouteConfig[];
}

const initialState: InitialStateType = {
  stacks: null,
  preReservedStacks: JSON.parse(sessionStorage.getItem('preReservedStacks') || 'null') || [],
};

const stackNavigationSlice = createSlice({
  name: 'stackNavigation',
  initialState,
  reducers: {
    initialStacks: (state: InitialStateType, action: PayloadAction<InitialStackPayloadType>) => {
      const { routes, pathname } = action.payload;

      const paths: string[] = pathname.split('/').filter((path) => path);

      const stacksContainer: StackRouteConfig[] = [];

      let routesDeepCopy: RouteConfig[] = _.cloneDeep(routes);

      while (paths.length > 0) {
        const route = routesDeepCopy.find((routeCopy) => routeCopy.path === paths[0]);

        if (route) {
          const stackRoute = stackRouteHandler({
            route,
            preReservedStacks: state.preReservedStacks,
          });

          stacksContainer.push(stackRoute);

          routesDeepCopy = route.children || [];
        } else {
          const dynamicRoute = routesDeepCopy.find((routeCopy) => routeCopy.path.startsWith(':'));
          if (dynamicRoute) {
            const stackRoute = stackRouteHandler({
              route: dynamicRoute,
              customPath: paths[0],
              preReservedStacks: state.preReservedStacks,
            });

            stacksContainer.push(stackRoute);

            routesDeepCopy = dynamicRoute.children || [];
          }
        }

        paths.shift();
      }

      const stacksPathContainer = stacksContainer.map((route) => route.path);

      state.stacks = stacksContainer.map((stack, index) => ({
        title: stack.title,
        path: `/${stacksPathContainer.slice(0, index + 1).join('/')}`,
      }));
    },

    setStack: (state: InitialStateType, action: PayloadAction<SetStackPayloadType>) => {
      if (state.stacks !== null) {
        const index = state.stacks.findIndex((stack) => stack.path.endsWith(action.payload.path));

        const newPreReservedStacks = _.uniqWith(
          [...state.preReservedStacks, action.payload],
          _.isEqual
        );

        state.preReservedStacks = newPreReservedStacks;
        sessionStorage.setItem('preReservedStacks', JSON.stringify(newPreReservedStacks));

        if (!_.isNil(index) && index !== -1) {
          state.stacks[index].title = action.payload.title;
        }
      }
    },
  },
});

export const { setStack, initialStacks } = stackNavigationSlice.actions;

export const selectStackNavigation = ({ stackNavigation }: RootStore) =>
  _.cloneDeep(stackNavigation.stacks);

export default stackNavigationSlice.reducer;
