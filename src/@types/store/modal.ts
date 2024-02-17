import { Breakpoint } from '@mui/material';
import { ReactNode } from 'react';

export interface ModalPayloadType {
  open?: boolean;
  title?: string;
  body: ReactNode;
  key: string;
  maxWidth?: Breakpoint;
  scroll?: 'body' | 'paper';
  closeIcon?: ReactNode;
  fullScreen?: boolean;
  slideDirection?: 'down' | 'left' | 'right' | 'up';
  onClose?: () => void;
  onOpen?: () => void;
}
