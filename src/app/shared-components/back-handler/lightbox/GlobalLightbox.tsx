import React from 'react';
import Lightbox from 'react-image-lightbox';
import queryString from 'query-string';
import history from '@history';
import { clearLightBox, closeLightBox } from 'app/store/lightboxSlice';
import { useFuseDispatch, useFuseSelector } from 'src/app/utils/hooks/useStore';
import { LightboxPayloadType } from '@types-fuse/store/lightbox';

const GlobalLightBox = () => {
  const { lightBoxPack, open } = useFuseSelector((state) => state.lightbox);
  const [lightBoxInfo, setLightBoxInfo] = React.useState<LightboxPayloadType>({
    images: [],
    currentIndex: 0,
  });
  const dispatch = useFuseDispatch();
  const handleClose = React.useCallback(() => {
    if (queryString.parse(history.location.search).openLightBox) {
      history.go(-1);
    }
    dispatch(closeLightBox());
  }, [dispatch]);

  React.useEffect(() => {
    if (lightBoxPack.length && !lightBoxInfo.images.length) {
      setLightBoxInfo({ ...lightBoxPack[0] });
      dispatch(clearLightBox());
      // for backHandler
      if (!queryString.parse(history.location.search).openLightBox) {
        const params = queryString.parse(history.location.search);
        history.push(`?${queryString.stringify({ ...params, openLightBox: 1 })}`);
      }
    } else if (lightBoxPack.length && lightBoxInfo.images.length && open) {
      handleClose();
    }
  }, [lightBoxInfo, lightBoxPack, open, dispatch, handleClose]);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.removeAttribute('style');
      setTimeout(() => setLightBoxInfo({ images: [], currentIndex: 0 }), 300);
    }
  }, [open]);

  return open && lightBoxInfo.images.length ? (
    <Lightbox
      reactModalStyle={{
        overlay: {
          direction: 'ltr',
          zIndex: 10000,
        },
      }}
      mainSrc={lightBoxInfo.images[lightBoxInfo.currentIndex]}
      nextSrc={
        lightBoxInfo.images.length > 1
          ? lightBoxInfo.images[(lightBoxInfo.currentIndex + 1) % lightBoxInfo.images.length]
          : undefined
      }
      prevSrc={
        lightBoxInfo.images.length > 1
          ? lightBoxInfo.images[
              (lightBoxInfo.currentIndex + lightBoxInfo.images.length - 1) %
                lightBoxInfo.images.length
            ]
          : undefined
      }
      onMovePrevRequest={() =>
        setLightBoxInfo((lastVal) => ({
          ...lastVal,
          currentIndex: (lastVal.currentIndex + lastVal.images.length - 1) % lastVal.images.length,
        }))
      }
      onMoveNextRequest={() =>
        setLightBoxInfo((lastVal) => ({
          ...lastVal,
          currentIndex: (lastVal.currentIndex + 1) % lastVal.images.length,
        }))
      }
      onCloseRequest={handleClose}
    />
  ) : null;
};

export default GlobalLightBox;
