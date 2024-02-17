import React from 'react';
import history from '@history';
import queryString from 'query-string';
import { closeModal } from 'app/store/modalSlice';
import { useFuseDispatch, useFuseSelector } from 'src/app/utils/hooks/useStore';
import { closeAlertDialog } from 'app/store/alertDialogSlice';
import { closeLightBox } from 'app/store/lightboxSlice';

const BackHandler = () => {
  const dispatch = useFuseDispatch();

  const { modalLength, isDialogOpen, isLightBoxOpen } = useFuseSelector((state) => ({
    modalLength: state.modal.length,
    isDialogOpen: state.alertDialog.open,
    isLightBoxOpen: state.lightbox.open,
  }));

  React.useEffect(() => {
    // if user refresh the app when the modal or any persist UI component is open
    // check and clear URL
    // if user open the modal in new tab we must replace the URL without parameters
    const queryParameters = Object.entries(queryString.parse(history.location.search));
    if (queryParameters.length) {
      const persistComponentsParams = ['modal', 'calendar', 'openLightBox', 'openDialog'];
      if (window.history.length <= 2) {
        const params = queryParameters.filter(
          ([key]) => persistComponentsParams.indexOf(String(key)) === -1
        );
        history.replace(
          `${history.location.pathname}${
            params.length ? `?${queryString.stringify(Object.fromEntries(params))}` : ''
          }`
        );
      } else {
        queryParameters.forEach(([key, value]) => {
          if (persistComponentsParams.includes(key) && value) {
            for (let i = 0; i < +value; i += 1) {
              history.go(-1);
            }
          }
        });
      }
    }
  }, []);

  React.useEffect(() => {
    const unregister = history.listen(({ action, location }) => {
      if (action === 'POP') {
        if (isDialogOpen && !queryString.parse(location.search).openDialog) {
          dispatch(closeAlertDialog());
        } else if (isLightBoxOpen && !queryString.parse(location.search).openLightBox) {
          dispatch(closeLightBox());
        } else if (modalLength) {
          const { modal } = queryString.parse(location.search);
          if (!modal || +modal < modalLength) {
            dispatch(closeModal());
          }
        }
      }
    });

    return () => unregister();
  }, [dispatch, isDialogOpen, isLightBoxOpen, modalLength]);

  return null;
};

export default React.memo(BackHandler);
