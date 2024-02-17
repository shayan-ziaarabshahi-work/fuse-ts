import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import queryString from 'query-string';
import history from '@history';
import { clearAlertDialogPack, closeAlertDialog } from 'app/store/alertDialogSlice';
import { useFuseDispatch, useFuseSelector } from 'src/app/utils/hooks/useStore';
import { AlertDialogPayloadType } from '@types-fuse/store/alertDialog';

export default function GlobalAlertDialog() {
  const { open, dialogPack } = useFuseSelector((state) => state.alertDialog);
  const [dialogInfo, setDialogInfo] = React.useState<AlertDialogPayloadType>();
  const dispatch = useFuseDispatch();
  const handleClose = React.useCallback(() => {
    dispatch(closeAlertDialog());
    // for backHandler
    if (queryString.parse(history.location.search).openDialog) {
      history.go(-1);
    }
  }, [dispatch]);

  const closeFirst = (callBack: () => void) => () => {
    callBack();
    handleClose();
  };
  const afterCloseHandler = () => setDialogInfo(undefined);

  React.useEffect(() => {
    if (dialogPack.length && !dialogInfo) {
      setDialogInfo({ ...dialogPack[0] });
      dispatch(clearAlertDialogPack());
      // for backHandler
      if (!queryString.parse(history.location.search).openDialog) {
        const params = queryString.parse(history.location.search);
        history.push(`?${queryString.stringify({ ...params, openDialog: 1 })}`);
      }
    } else if (dialogPack.length && dialogInfo && open) {
      handleClose();
    }
  }, [dialogPack, dialogInfo, open, dispatch, handleClose]);

  return (
    <Dialog
      open={!!dialogInfo && open}
      onClose={handleClose}
      scroll="body"
      key={dialogInfo?.key}
      maxWidth={dialogInfo?.maxWidth || 'xs'}
      fullWidth
      TransitionProps={{ onExited: afterCloseHandler }}
    >
      <DialogTitle>{dialogInfo?.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogInfo?.body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogInfo?.onCancel ? closeFirst(dialogInfo.onCancel) : handleClose}>
          {dialogInfo?.cancelText || (dialogInfo?.onOk ? 'لغو' : 'قبول')}
        </Button>
        {dialogInfo?.onOk && (
          <Button onClick={closeFirst(dialogInfo.onOk)}>{dialogInfo.okText || 'قبول'}</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
