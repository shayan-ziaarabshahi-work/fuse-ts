/* eslint import/no-extraneous-dependencies: off */
import {
  ActionReducerMapBuilder,
  AnyAction,
  ThunkDispatch,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import history from '@history';
import _ from '@lodash';
import { setInitialSettings } from 'app/store/fuse/settingsSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import settingsConfig from 'app/configs/settingsConfig';
import { FuseUserType } from '@types-fuse/store/user';
import { RootStore } from '..';
import JwtService from 'src/app/auth/services/jwtService';

export const setUser = createAsyncThunk(
  'user/setUser',
  async (user: FuseUserType, { dispatch, getState }) => {
    /*
    You can redirect the logged-in user to a specific route depending on his role
    */

    if (user.loginRedirectUrl) {
      settingsConfig.loginRedirectUrl = user.loginRedirectUrl; // for example 'apps/academy'
    }

    return user;
  }
);

export const updateUserSettings = createAsyncThunk<any, any>(
  'user/updateSettings',
  async (settings, { dispatch, getState }) => {
    const { user } = getState() as RootStore;
    const newUser = _.merge({}, user, { data: { settings } });

    dispatch(updateUserData(newUser) as unknown as AnyAction);

    return newUser;
  }
);

export const updateUserShortcuts = createAsyncThunk(
  'user/updateShortucts',
  async (shortcuts, { dispatch, getState }) => {
    const { user } = getState() as RootStore;
    const newUser = {
      ...user,
      data: {
        ...user.data,
        shortcuts: shortcuts as unknown as string[],
      },
    };

    dispatch(updateUserData(newUser) as unknown as AnyAction);

    return newUser;
  }
);

export const logoutUser =
  () =>
  async (dispatch: ThunkDispatch<RootStore, unknown, AnyAction>, getState: () => RootStore) => {
    const { user } = getState();

    if (!user.role || user.role.length === 0) {
      // is guest
      return null;
    }

    history.push({
      pathname: '/',
    });

    dispatch(setInitialSettings());

    return dispatch(userLoggedOut());
  };

export const updateUserData =
  (user: FuseUserType) =>
  async (dispatch: ThunkDispatch<RootStore, unknown, AnyAction>, getState: () => RootStore) => {
    if (!user.role || user.role.length === 0) {
      // is guest
      return;
    }

    JwtService.updateUserData(user)
      .then(() => {
        dispatch(showMessage({ message: 'User data saved with api' }));
      })
      .catch((error) => {
        dispatch(showMessage({ message: error.message }));
      });
  };

const initialState: FuseUserType = {
  role: [], // guest
  data: {
    displayName: 'John Doe',
    photoURL: 'assets/images/avatars/brian-hughes.jpg',
    email: 'johndoe@withinpixels.com',
    shortcuts: ['apps.calendar', 'apps.mailbox', 'apps.contacts', 'apps.tasks'],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoggedOut: () => initialState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<FuseUserType>) => {
    builder.addCase(updateUserSettings.fulfilled, (state, action) => action.payload);
    builder.addCase(updateUserShortcuts.fulfilled, (state, action) => action.payload);
    builder.addCase(setUser.fulfilled, (state, action) => action.payload);
  },
});

export const { userLoggedOut } = userSlice.actions;

export const selectUser = ({ user }: RootStore) => user;

export const selectUserShortcuts = ({ user }: RootStore) => user.data?.shortcuts;

export default userSlice.reducer;
