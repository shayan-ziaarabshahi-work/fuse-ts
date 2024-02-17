import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { AsyncReducersType } from '@types-fuse/store/asyncReducers';
import reducers from './reducers';

const combinedReducersForStateType = combineReducers(reducers);

const createReducer =
  (asyncReducers?: AsyncReducersType) =>
  (state: ReturnType<typeof combinedReducersForStateType> | undefined, action: AnyAction) => {
    const combinedReducers = combineReducers({
      ...reducers,
      ...asyncReducers,
    });

    /*
	Reset the redux store when user logged out
	 */
    if (action.type === 'user/userLoggedOut') {
      state = undefined;
    }

    return combinedReducers(state, action);
  };

export default createReducer;
