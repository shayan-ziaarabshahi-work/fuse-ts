import CSS from 'csstype';
import { FuseColorOptions } from '@types-fuse/theme/index';

export type AnchorOriginType = {
  vertical: 'bottom' | 'top';
  horizontal: 'center' | 'right' | 'left';
};

export type MessageOptionsType = {
  anchorOrigin: AnchorOriginType;
  autoHideDuration: number;
  style: CSS.Properties;
  message: string;
  variant: FuseColorOptions | null;
};

export interface MessageState {
  state: null | boolean;
  options: MessageOptionsType;
}
