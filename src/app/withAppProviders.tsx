// import createGenerateClassName from '@mui/styles/createGenerateClassName';
// import jssPreset from '@mui/styles/jssPreset';
// import { create } from 'jss';
// import jssExtend from 'jss-plugin-extend';
// import rtl from 'jss-rtl';
import Provider from 'react-redux/es/components/Provider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StyledEngineProvider } from '@mui/material/styles';
import routes from 'app/configs/routesConfig';
import store from './store/index';
import AppContext from './AppContext';
import { ComponentType } from 'react';
import AdapterJalali from '@date-io/date-fns-jalali';
import { MuiPickersAdapter } from '@mui/x-date-pickers/internals';

class Adapter extends AdapterJalali {
  getWeekdays = () => {
    return ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
  };
}

const withAppProviders = (Component: ComponentType) => (props?: any) => {
  const WrapperComponent = () => (
    <AppContext.Provider
      value={{
        routes,
      }}
    >
      <LocalizationProvider
        dateAdapter={Adapter as new (...args: any) => MuiPickersAdapter<unknown>}
        dateFormats={{ monthShort: 'MMMM', weekdayShort: 'dddd' }}
        localeText={{ okButtonLabel: 'تایید', cancelButtonLabel: 'انصراف' }}
      >
        <Provider store={store}>
          <StyledEngineProvider injectFirst>
            <Component {...props} />
          </StyledEngineProvider>
        </Provider>
      </LocalizationProvider>
    </AppContext.Provider>
  );

  return WrapperComponent;
};

export default withAppProviders;
