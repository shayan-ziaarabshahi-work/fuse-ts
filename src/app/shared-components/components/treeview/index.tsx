import { memo, FC, lazy, useCallback, forwardRef } from 'react';
import { FormControl, InputLabel, Box, Button, Typography } from '@mui/material';
import { styled, darken } from '@mui/material/styles';
import { useFuseDispatch } from 'src/app/utils/hooks/useStore';
import { openModal } from 'app/store/modalSlice';
import FuseSuspense from '@fuse/core/FuseSuspense';
import Spin from 'app/shared-components/global/Spin';
import TreeviewCheckBox from './treeview-checkbox';
import { TreeviewProps } from './models';

const Cheap = lazy(() => import('./preview/Cheap'));
const ReadOnlyTreeView = lazy(() => import('./preview/TreeViewReadOnly'));

const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
  position: 'absolute',
  padding: '0 8px',
  top: '-6px',
  display: 'block',
  background: theme.palette.background.default,
}));

const CustomTreeview: FC<TreeviewProps> = forwardRef(
  (
    {
      label,
      buttonConfig = {
        text: 'بازکردن',
        variant: 'contained',
        color: 'primary',
      },
      treeviewSource,
      dialogTitle = '',
      scrollModalType = 'paper',
      confirmButtonText = 'تایید',
      config,
      searchToolbar = true,
      value = [],
      onChange,
      isLoading = false,
      error,
      onRemoveItemFromCheap,
      ...props
    },
    ref
  ) => {
    const dispatch = useFuseDispatch();

    const renderPreview = useCallback(() => {
      switch (config.previewResultType) {
        case 'treeviewReadOnly':
          return (
            <ReadOnlyTreeView
              treeData={treeviewSource}
              config={config}
              key="ReadOnlyTreeView"
              onChange={onChange}
              value={value}
            />
          );
        case 'cheap':
          return (
            <Cheap
              treeData={treeviewSource}
              config={config}
              key="Cheap"
              onChange={onChange}
              value={value}
              onRemoveItemFromCheap={onRemoveItemFromCheap}
            />
          );
        default:
          return null;
      }
    }, [config, treeviewSource, value, onChange, onRemoveItemFromCheap]);

    const ModalBody = memo(() => {
      return (
        <TreeviewCheckBox
          treeData={treeviewSource}
          confirmButtonText={confirmButtonText}
          config={config}
          searchToolbar={searchToolbar}
          onChange={onChange}
          value={value}
          ref={ref}
          {...props}
        />
      );
    });

    return (
      <FormControl className="block px-[4px] py-10">
        <CustomInputLabel error={!!error && !value.length}>{label}</CustomInputLabel>
        <Spin spinning={isLoading}>
          <Box
            sx={{
              border: (theme) =>
                !!error && !value.length
                  ? `1px solid ${theme.palette.error.light}`
                  : `1px solid ${darken(theme.palette.divider, 0.1)}`,
              borderRadius: '4px',
              padding: '10px',
              marginTop: '10px',
            }}
          >
            <FuseSuspense>{renderPreview()}</FuseSuspense>
            {/* @ts-ignore */}
            <Button
              variant={buttonConfig.variant}
              color={buttonConfig.color}
              onClick={() => {
                dispatch(
                  openModal({
                    title: dialogTitle,
                    body: <ModalBody />,
                    scroll: scrollModalType,
                    maxWidth: 'md',
                    key: `treeView`,
                  })
                );
              }}
              disabled={isLoading}
            >
              {buttonConfig.text}
            </Button>
          </Box>
        </Spin>
        {typeof error !== 'boolean' && error?.message ? (
          <Typography color="error">{error.message}</Typography>
        ) : null}
      </FormControl>
    );
  }
);

export default memo(CustomTreeview);
