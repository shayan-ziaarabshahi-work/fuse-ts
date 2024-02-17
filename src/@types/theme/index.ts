import { ThemeOptions } from '@mui/material';

export type FuseThemeOptions = ThemeOptions & {
  status?: {
    danger?: string;
  };
};

export type FuseColorOptions =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'string';

export type FuseButtonVariantOptions = 'contained' | 'outlined' | 'text';

export type FuseDirectionOptions = 'down' | 'up' | 'left' | 'right';
