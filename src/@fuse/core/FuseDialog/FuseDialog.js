import Dialog from '@mui/material/Dialog';
import { useFuseDispatch, useFuseSelector } from 'src/app/utils/hooks/useStore';
import {
  closeDialog,
  selectFuseDialogOptions,
  selectFuseDialogState,
} from 'app/store/fuse/dialogSlice';

function FuseDialog(props) {
  const dispatch = useFuseDispatch();
  const state = useFuseSelector(selectFuseDialogState);
  const options = useFuseSelector(selectFuseDialogOptions);

  return (
    <Dialog
      open={state}
      onClose={(ev) => dispatch(closeDialog())}
      aria-labelledby="fuse-dialog-title"
      classes={{
        paper: 'rounded-8',
      }}
      {...options}
    />
  );
}

export default FuseDialog;
