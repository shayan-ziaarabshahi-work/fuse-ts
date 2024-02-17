import { createTheme, getContrastRatio } from '@mui/material/styles';
import {
  AnyAction,
  PayloadAction,
  ThunkDispatch,
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import _ from '@lodash';
import {
  defaultSettings,
  defaultThemeOptions,
  extendThemeWithMixins,
  getParsedQuerySettings,
  mustHaveThemeOptions,
} from '@fuse/default-settings';
import settingsConfig from 'app/configs/settingsConfig';
import themeLayoutConfigs from 'app/theme-layouts/themeLayoutConfigs';
import { setUser, updateUserSettings } from 'app/store/userSlice';
import { darkPaletteText, lightPaletteText } from 'app/configs/themesConfig';
import { RootStore } from '..';
import { FuseDirectionOptions, FuseThemeOptions } from '@types-fuse/theme';
import { Layout1SettingPageConfig } from '@types-fuse/layout/layout1';
import { SettingPageConfig } from '@types-fuse/routes';

export const changeFuseTheme =
  (theme: FuseThemeOptions) =>
  (dispatch: ThunkDispatch<RootStore, unknown, AnyAction>, getState: () => RootStore) => {
    const { fuse } = getState();
    const { settings } = fuse;

    const newSettings = {
      ...settings.current,
      theme: {
        main: theme,
        navbar: theme,
        toolbar: theme,
        footer: theme,
      },
    };

    dispatch(setDefaultSettings(newSettings));
  };

function getInitialSettings() {
  const defaultLayoutStyle =
    settingsConfig.layout && settingsConfig.layout.style ? settingsConfig.layout.style : 'layout1';
  const layout = {
    style: defaultLayoutStyle,
    config: themeLayoutConfigs[defaultLayoutStyle].defaults,
  };
  return _.merge({}, defaultSettings, { layout }, settingsConfig, getParsedQuerySettings());
}

export function generateSettings(
  _defaultSettings: SettingPageConfig,
  _newSettings?: SettingPageConfig
) {
  const response = _.merge(
    {},
    _defaultSettings,
    { layout: { config: themeLayoutConfigs[_newSettings?.layout?.style || 'layout1']?.defaults } },
    _newSettings
  );

  return response;
}

const initialSettings = getInitialSettings();

const initialState = {
  initial: initialSettings,
  defaults: _.merge({}, initialSettings),
  current: _.merge({}, initialSettings),
  themes: null,
};

export const setDefaultSettings = createAsyncThunk<any, any>(
  'fuse/settings/setDefaultSettings',
  async (val, { dispatch, getState }) => {
    const { fuse } = getState() as RootStore;
    const { settings } = fuse;
    const defaults = generateSettings(settings.defaults, val);

    dispatch(updateUserSettings(defaults));

    return {
      ...settings,
      defaults: _.merge({}, defaults),
      current: _.merge({}, defaults),
    };
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<any>) => {
      const current = generateSettings(state.defaults, action.payload);

      return {
        ...state,
        current,
      };
    },

    setInitialSettings: () => {
      return _.merge({}, initialState);
    },
    resetSettings: (state) => {
      return {
        ...state,
        defaults: _.merge({}, state.defaults),
        current: _.merge({}, state.defaults),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setDefaultSettings.fulfilled, (state, action) => action.payload);
    builder.addCase(setUser.fulfilled, (state, action) => {
      const defaults = generateSettings(state.defaults, action.payload?.data?.settings);
      return {
        ...state,
        defaults: _.merge({}, defaults),
        current: _.merge({}, defaults),
      };
    });
  },
});

const getDirection = (state: RootStore) => state.fuse.settings.current.direction;
const getMainTheme = (state: RootStore) => state.fuse.settings.current.theme.main;
const getNavbarTheme = (state: RootStore) => state.fuse.settings.current.theme.navbar;
const getToolbarTheme = (state: RootStore) => state.fuse.settings.current.theme.toolbar;
const getFooterTheme = (state: RootStore) => state.fuse.settings.current.theme.footer;

function generateMuiTheme(
  theme: FuseThemeOptions,
  direction: Extract<FuseDirectionOptions, 'right' | 'left'>
) {
  const data = _.merge({}, defaultThemeOptions, theme, mustHaveThemeOptions);
  const response = createTheme(
    _.merge({}, data, {
      mixins: extendThemeWithMixins(data),
      direction,
    })
  );
  return response;
}

export const selectContrastMainTheme = (bgColor: string) => {
  function isDark(color: string) {
    return getContrastRatio(color, '#ffffff') >= 3;
  }
  return isDark(bgColor) ? selectMainThemeDark : selectMainThemeLight;
};

function changeThemeMode(theme: FuseThemeOptions, mode: 'dark' | 'light') {
  const modes = {
    dark: {
      palette: {
        mode: 'dark',
        divider: 'rgba(241,245,249,.12)',
        background: {
          paper: '#1E2125',
          default: '#121212',
        },
        text: darkPaletteText,
      },
    },
    light: {
      palette: {
        mode: 'light',
        divider: '#e2e8f0',
        background: {
          paper: '#FFFFFF',
          default: '#F7F7F7',
        },
        text: lightPaletteText,
      },
    },
  };

  return _.merge({}, theme, modes[mode]);
}

export const selectMainTheme = createSelector([getMainTheme, getDirection], (theme, direction) =>
  generateMuiTheme(theme, direction)
);

export const selectMainThemeDark = createSelector(
  [getMainTheme, getDirection],
  (theme, direction) => generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectMainThemeLight = createSelector(
  [getMainTheme, getDirection],
  (theme, direction) => generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectNavbarTheme = createSelector(
  [getNavbarTheme, getDirection],
  (theme, direction) => generateMuiTheme(theme, direction)
);

export const selectNavbarThemeDark = createSelector(
  [getNavbarTheme, getDirection],
  (theme, direction) => generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectNavbarThemeLight = createSelector(
  [getNavbarTheme, getDirection],
  (theme, direction) => generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectToolbarTheme = createSelector(
  [getToolbarTheme, getDirection],
  (theme, direction) => generateMuiTheme(theme, direction)
);

export const selectToolbarThemeDark = createSelector(
  [getToolbarTheme, getDirection],
  (theme, direction) => generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectToolbarThemeLight = createSelector(
  [getToolbarTheme, getDirection],
  (theme, direction) => generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectFooterTheme = createSelector(
  [getFooterTheme, getDirection],
  (theme, direction) => generateMuiTheme(theme, direction)
);

export const selectFooterThemeDark = createSelector(
  [getFooterTheme, getDirection],
  (theme, direction) => generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectFooterThemeLight = createSelector(
  [getFooterTheme, getDirection],
  (theme, direction) => generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectFuseCurrentSettings = ({ fuse }: RootStore) => fuse.settings.current;

export const selectFuseCurrentLayoutConfig = ({ fuse }: RootStore): Layout1SettingPageConfig =>
  fuse.settings.current.layout.config;

export const selectFuseDefaultSettings = ({ fuse }: RootStore) => fuse.settings.defaults;

export const selectFuseThemesSettings = ({ fuse }: RootStore) => fuse.settings.themes;

export const { resetSettings, setInitialSettings, setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
