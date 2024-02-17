import { ForwardRefRenderFunction, ReactNode } from 'react';

interface FusePageSimpleProps {
  leftSidebarContent?: ReactNode;
  leftSidebarVariant?: ReactNode;
  rightSidebarContent?: ReactNode;
  rightSidebarVariant?: ReactNode;
  header?: ReactNode;
  content?: ReactNode;
  scroll?: 'normal' | 'page' | 'content';
  leftSidebarOpen?: boolean;
  rightSidebarOpen?: boolean;
  leftSidebarWidth?: number;
  rightSidebarWidth?: number;
  rightSidebarOnClose?: () => void;
  leftSidebarOnClose?: () => void;
}

declare const Component: ForwardRefRenderFunction<any, FusePageSimpleProps>;

export default Component;
