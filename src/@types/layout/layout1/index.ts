import {
  Footer1Config,
  LeftSidePanel1Config,
  Navbar1Config,
  RightSidePanel1Config,
  Toolbar1Config,
} from './customLayoutTypes';

type Layout1Fields =
  | 'mode'
  | 'containerWidth'
  | 'navbar'
  | 'toolbar'
  | 'footer'
  | 'rightSidePanel'
  | 'leftSidePanel';

export interface Layout1SettingPageConfig {
  mode?: 'fullwidth' | 'boxed' | 'container';
  containerWidth?: number | string;
  navbar?: Partial<Navbar1Config>;
  toolbar?: Partial<Toolbar1Config>;
  footer?: Partial<Footer1Config>;
  rightSidePanel?: Partial<RightSidePanel1Config>;
  leftSidePanel?: Partial<LeftSidePanel1Config>;
}

export interface Layout1ConfigType {
  title: string;
  defaults: Layout1SettingPageConfig;
  form: { [key in Layout1Fields]?: any };
}
