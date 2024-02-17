import { FuseDirectionOptions } from '@types-fuse/theme';
import { ReactNode } from 'react';
import { Breakpoint } from '@mui/material';

export interface ModalComponentProps {
  index: number;
  onOpen?: () => void;
  onClose?: () => void;
  open?: boolean;
  slideDirection?: FuseDirectionOptions;
  title?: string;
  closeIcon?: ReactNode;
  maxWidth?: Breakpoint;
  scroll?: 'body' | 'paper';
  fullScreen?: boolean;
  body?: ReactNode;
  showCloseIcon?: boolean;
}
