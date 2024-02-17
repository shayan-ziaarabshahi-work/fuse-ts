import { FuseAuthRoles } from '@types-fuse/authentication';
import { Layout1SettingPageConfig } from '@types-fuse/layout/layout1';
import { FuseThemeOptions } from '@types-fuse/theme';
import { ReactNode } from 'react';
export interface SettingPageConfig {
  theme?: {
    main?: FuseThemeOptions;
    navbar?: FuseThemeOptions;
    toolbar?: FuseThemeOptions;
    footer?: FuseThemeOptions;
  };
  layout?: {
    config?: Layout1SettingPageConfig;
    style?: 'layout1' | 'layout2' | 'layout3';
  };
}
export interface RouteConfig {
  path: string;
  element?: ReactNode;
  title?: ReactNode;
  auth?: FuseAuthRoles;
  children?: RouteConfig[];
  settings?: SettingPageConfig;
}
export interface PageConfig {
  auth?: FuseAuthRoles;
  settings?: SettingPageConfig;
  routes: RouteConfig[];
}

export type StackRouteConfig = Pick<Required<RouteConfig>, 'title' | 'path'>;
