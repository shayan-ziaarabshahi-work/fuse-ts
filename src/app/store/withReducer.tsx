import { combineReducers } from '@reduxjs/toolkit';
import { injectReducer } from 'app/store/index';
import { ComponentType, ReactElement } from 'react';

const withReducer =
  (key: string, reducer: ReturnType<typeof combineReducers>) =>
  (WrappedComponent: ComponentType) => {
    injectReducer(key, reducer);

    return (props: any): ReactElement => <WrappedComponent {...props} />;
  };

export default withReducer;
