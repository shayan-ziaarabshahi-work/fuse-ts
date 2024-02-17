import { FuseAuthRoles } from '@types-fuse/authentication';
import { FuseThemeOptions } from '@types-fuse/theme';

export interface FuseSettingsConfig {
  layout?: {
    style?: 'layout1' | 'layout2' | 'layout3';
    config?: any;
  };
  theme?: {
    main?: FuseThemeOptions;
    navbar?: FuseThemeOptions;
    toolbar?: FuseThemeOptions;
    footer?: FuseThemeOptions;
  };
  customScrollbars?: boolean;
  direction?: 'ltr' | 'rtl';
  defaultAuth?: FuseAuthRoles;
  loginRedirectUrl?: string;
}

export type ThrowErrorType = (err?: Error) => void;
