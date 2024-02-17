import { FuseAuthRoles } from '@types-fuse/authentication';

export interface CommonNavigationConfig {
  id: string;
  title: string;
  icon?: string;
  subtitle?: string;
  translate?: string;
  auth?: FuseAuthRoles;
}

export type ItemNavigationConfig = CommonNavigationConfig & {
  type: 'item';
  url: string;
};

export type GroupNavigationConfig = CommonNavigationConfig & {
  type: 'group' | 'collapse';
  children: NavigationConfig[];
};

export type NavigationConfig = ItemNavigationConfig | GroupNavigationConfig;
