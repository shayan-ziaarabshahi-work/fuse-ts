import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import { useFuseSelector, useFuseDispatch } from 'src/app/utils/hooks/useStore';
import { selectNavigation } from 'app/store/fuse/navigationSlice';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { navbarCloseMobile } from 'app/store/fuse/navbarSlice';

function Navigation(props) {
  const navigation = useFuseSelector(selectNavigation);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const dispatch = useFuseDispatch();

  return useMemo(() => {
    function handleItemClick(item) {
      if (isMobile) {
        dispatch(navbarCloseMobile());
      }
    }

    return (
      <FuseNavigation
        className={clsx('navigation', props.className)}
        navigation={navigation}
        layout={props.layout}
        dense={props.dense}
        active={props.active}
        onItemClick={handleItemClick}
      />
    );
  }, [dispatch, isMobile, navigation, props.active, props.className, props.dense, props.layout]);
}

Navigation.defaultProps = {
  layout: 'vertical',
};

export default memo(Navigation);
