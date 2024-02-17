import { FuseButtonVariantOptions, FuseColorOptions } from '@types-fuse/theme';

export type TConfigTreeview = {
  outputType: string;
  outputValue: 'child' | 'childAndParent';
  labelField: string;
  previewResultType?: 'cheap' | 'treeviewReadOnly' | null;
};

export type TButtonConfig = {
  text?: string;
  variant?: FuseButtonVariantOptions;
  color?: FuseColorOptions;
};

export type TError = {
  type?: string;
  ref?: any;
  message?: any;
};

export interface TreeviewProps {
  label: string;
  treeviewSource: any[];
  dialogTitle?: string;
  scrollModalType?: 'paper' | 'body';
  confirmButtonText?: string;
  config: TConfigTreeview;
  searchToolbar?: boolean;
  buttonConfig?: TButtonConfig;
  onRemoveItemFromCheap?: (data: any) => void;
  value: any[];
  onChange: any;
  isLoading?: boolean;
  ref?: any;
  error?: TError | boolean;
}

export interface PreviewProps {
  treeData: any;
  config: TConfigTreeview;
  value?: any;
  onChange?: any;
}

export interface CheapPreviewProps extends PreviewProps {
  onRemoveItemFromCheap?: (data: any) => void;
}

export interface TreeviewCheckBoxProps {
  treeData: any;
  config: TConfigTreeview;
  confirmButtonText: string;
  searchToolbar?: boolean;
  value?: any;
  onChange?: any;
  ref?: any;
}

export type TSampleTreeData = {
  id: number | string;
  value: string;
  label: string;
  children?: TSampleTreeData[];
};
