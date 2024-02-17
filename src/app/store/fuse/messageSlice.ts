import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MessageState, MessageOptionsType } from '@types-fuse/store/message';
import { RootStore } from '..';

const initialState: MessageState = {
  state: null,
  options: {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    autoHideDuration: 5000,
    style: { zIndex: 10000000000 },
    message: 'Hi',
    variant: null,
  },
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    showMessage: (state, action: PayloadAction<Partial<MessageOptionsType>>) => {
      state.state = true;
      state.options = {
        ...initialState.options,
        ...action.payload,
      };
    },
    hideMessage: (state, action) => {
      state.state = null;
    },
  },
});

export const { hideMessage, showMessage } = messageSlice.actions;

export const selectFuseMessageState = ({ fuse }: RootStore) => fuse.message.state;

export const selectFuseMessageOptions = ({ fuse }: RootStore) => fuse.message.options;

export default messageSlice.reducer;
