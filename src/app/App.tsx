import '@mock-api';
import BrowserRouter from '@fuse/core/BrowserRouter';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import { SnackbarProvider } from 'notistack';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { selectUser } from 'app/store/userSlice';
import themeLayouts from 'app/theme-layouts/themeLayouts';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import settingsConfig from 'app/configs/settingsConfig';
import withAppProviders from './withAppProviders';
import { AuthProvider } from './auth/AuthContext';
import BackHandler from './shared-components/back-handler/BackHandler';
import GlobalModal from './shared-components/back-handler/modal/GlobalModal';
import GlobalAlertDialog from './shared-components/back-handler/alertDialog/GlobalAlertDialog';
import GlobalLightBox from './shared-components/back-handler/lightbox/GlobalLightbox';
import { useFuseSelector } from './utils/hooks/useStore';
import ErrorBoundary from './shared-components/error-boundary';
import CKEditorStyle from './shared-components/components/ck-editor/CKEditorStyle';
import { selectCurrentLanguageDirection } from './store/i18nSlice';
import axios from 'axios';

// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
axios.defaults.baseURL = "" ;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const emotionCacheOptions = {
  rtl: {
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById('emotion-insertion-point') || undefined,
  },
  ltr: {
    key: 'muiltr',
    stylisPlugins: [],
    insertionPoint: document.getElementById('emotion-insertion-point') || undefined,
  },
};

const App = () => {
  const user = useFuseSelector(selectUser);
  const langDirection = useFuseSelector(selectCurrentLanguageDirection);
  const mainTheme = useFuseSelector(selectMainTheme);

  return (
    <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
      <FuseTheme theme={mainTheme} direction={langDirection}>
        <ErrorBoundary>
          <AuthProvider>
            <BrowserRouter basename="" window={undefined}>
              <CKEditorStyle />
              <BackHandler />
              <GlobalModal />
              <GlobalAlertDialog />
              <GlobalLightBox />
              <FuseAuthorization
                userRole={user.role}
                loginRedirectUrl={settingsConfig.loginRedirectUrl}
              >
                <SnackbarProvider
                  maxSnack={5}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  classes={{
                    containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99',
                  }}
                >
                  <FuseLayout layouts={themeLayouts} />
                </SnackbarProvider>
              </FuseAuthorization>
            </BrowserRouter>
          </AuthProvider>
        </ErrorBoundary>
      </FuseTheme>
    </CacheProvider>
  );
};

export default withAppProviders(App)();
