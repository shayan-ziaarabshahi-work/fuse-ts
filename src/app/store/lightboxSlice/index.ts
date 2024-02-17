import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LightboxPayloadType } from '@types-fuse/store/lightbox';

type InitialStateType = {
  open: boolean;
  lightBoxPack: LightboxPayloadType[];
};

const initialState: InitialStateType = {
  open: false,
  lightBoxPack: [],
};

const imageLightBoxSlice = createSlice({
  name: 'lightBoxSlice',
  initialState,
  reducers: {
    openLightBox: (state: InitialStateType, action: PayloadAction<LightboxPayloadType>) => {
      state.lightBoxPack.push({
        ...action.payload,
        currentIndex: action.payload.currentIndex || 0,
      });
    },
    closeLightBox: (state: InitialStateType) => {
      state.open = false;
    },
    clearLightBox: (state: InitialStateType) => {
      return {
        open: true,
        lightBoxPack: state.lightBoxPack.slice(1),
      };
    },
  },
});

export const { openLightBox, closeLightBox, clearLightBox } = imageLightBoxSlice.actions;
export default imageLightBoxSlice.reducer;
