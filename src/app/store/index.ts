import { configureStore } from '@reduxjs/toolkit';
import createReducer from './rootReducer';
import { ReduxLoggerOptions } from '../../@types/store/logger';
import { AsyncReducersType } from '@types-fuse/store/asyncReducers';

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer.createReducer());
  });
}

const middlewares: any[] = [];

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require(`redux-logger`);

  const options: ReduxLoggerOptions = {
    collapsed: (getState, action, logEntry) => !logEntry?.error,
  };

  const logger = createLogger(options);

  middlewares.push(logger);
}

const store = configureStore({
  reducer: createReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: process.env.NODE_ENV === 'development',
});

const asyncReducers: AsyncReducersType = {};

export const injectReducer = (key: string, reducer: any) => {
  if (asyncReducers[key]) {
    return false;
  }
  asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(asyncReducers));
  return store;
};

export default store;

export type RootStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
