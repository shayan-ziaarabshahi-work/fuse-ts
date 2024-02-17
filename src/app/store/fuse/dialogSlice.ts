import { ReactNode } from 'react';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootStore } from '..';

type OptionType = {
  children: ReactNode;
};

interface DialogState {
  state: boolean;
  options: OptionType;
}

const initialState: DialogState = {
  state: false,
  options: {
    children: '',
  },
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<OptionType>) => {
      state.state = true;
      state.options = action.payload;
    },
    closeDialog: (state, action) => {
      state.state = false;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export const selectFuseDialogState = ({ fuse }: RootStore) => fuse.dialog.state;

export const selectFuseDialogOptions = ({ fuse }: RootStore) => fuse.dialog.options;

export default dialogSlice.reducer;
