import { AppDispatch, RootStore } from 'app/store/index';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useFuseDispatch: () => AppDispatch = useDispatch;
export const useFuseSelector: TypedUseSelectorHook<RootStore> = useSelector;
