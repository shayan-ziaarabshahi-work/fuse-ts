import { useFuseSelector, useFuseDispatch } from 'src/app/utils/hooks/useStore';
import FuseShortcuts from '@fuse/core/FuseShortcuts';
import { selectFlatNavigation } from 'app/store/fuse/navigationSlice';
import { selectUserShortcuts, updateUserShortcuts } from 'app/store/userSlice';

function NavigationShortcuts(props) {
  const { variant, className } = props;
  const dispatch = useFuseDispatch();
  const shortcuts = useFuseSelector(selectUserShortcuts) || [];
  const navigation = useFuseSelector(selectFlatNavigation);

  function handleShortcutsChange(newShortcuts) {
    dispatch(updateUserShortcuts(newShortcuts));
  }

  return (
    <FuseShortcuts
      className={className}
      variant={variant}
      navigation={navigation}
      shortcuts={shortcuts}
      onChange={handleShortcutsChange}
    />
  );
}

export default NavigationShortcuts;
