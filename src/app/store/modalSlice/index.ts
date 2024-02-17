import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import queryString from 'query-string';
import history from '@history';
import { ModalPayloadType } from '@types-fuse/store/modal';

type InitialStateType = ModalPayloadType[];
const initialState: InitialStateType = [];

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state: InitialStateType, action: PayloadAction<ModalPayloadType>) => {
      const { key = new Date().getTime().toString(), ...payload } = action.payload;
      const isInStackBefore = state.some((stackitem) => stackitem.key === key);

      if (isInStackBefore) {
        return state;
      }

      const newStackItem = {
        ...payload,
        key,
        open: true,
      };

      return [...state, newStackItem];
    },
    closeModal: (state: InitialStateType) => {
      const lastItem = state.length - 1;
      state[lastItem].open = false;
    },
    closeAllModals: (state: InitialStateType) => {
      return state.map((item) => ({ ...item, open: false }));
    },
    popModal: (state: InitialStateType) => {
      state.pop();
      const { modal } = queryString.parse(history.location.search);
      if (modal && +modal > state.length) history.go(-1);
    },
  },
});

export const { openModal, closeModal, closeAllModals, popModal } = modalSlice.actions;

export default modalSlice.reducer;
