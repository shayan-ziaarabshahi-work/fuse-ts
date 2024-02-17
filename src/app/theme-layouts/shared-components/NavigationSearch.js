import { useFuseSelector } from 'src/app/utils/hooks/useStore';
import FuseSearch from '@fuse/core/FuseSearch';
import { selectFlatNavigation } from 'app/store/fuse/navigationSlice';

function NavigationSearch(props) {
  const { variant, className } = props;
  const navigation = useFuseSelector(selectFlatNavigation);

  return <FuseSearch className={className} variant={variant} navigation={navigation} />;
}

export default NavigationSearch;
