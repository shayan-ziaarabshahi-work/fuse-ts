import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AlertDialogPayloadType } from '@types-fuse/store/alertDialog';

type InitialStateType = {
  dialogPack: AlertDialogPayloadType[];
  open: boolean;
};

const initialState: InitialStateType = {
  dialogPack: [],
  open: false,
};

const alertDialogSlice = createSlice({
  name: 'alertDialog',
  initialState,
  reducers: {
    openAlertDialog: (state: InitialStateType, action: PayloadAction<AlertDialogPayloadType>) => {
      state.dialogPack.push({ ...action.payload, key: new Date().getTime().toString() });
    },
    closeAlertDialog: (state: InitialStateType) => {
      state.open = false;
    },
    clearAlertDialogPack: (state: InitialStateType) => {
      return {
        open: true,
        dialogPack: state.dialogPack.slice(1),
      };
    },
  },
});

export const { openAlertDialog, clearAlertDialogPack, closeAlertDialog } = alertDialogSlice.actions;

export default alertDialogSlice.reducer;
