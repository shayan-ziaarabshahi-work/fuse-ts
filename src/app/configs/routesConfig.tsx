import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import { PageConfig, RouteConfig } from '@types-fuse/routes';
import HomeConfig from '../main/home/HomeConfig';

const routeConfigs: PageConfig[] = [
  HomeConfig,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
];

const mergedRoutes = FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth);

const defaultRoutes: RouteConfig[] = [
  {
    path: '/',
    element: <Navigate to="/home" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default [...mergedRoutes, ...defaultRoutes];
