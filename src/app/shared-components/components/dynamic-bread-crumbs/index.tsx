import { useFuseSelector } from '../../../utils/hooks/useStore';
import { selectStackNavigation } from '../../../store/stackNavigationSlice';
import { Link } from 'react-router-dom';

function DynamicBreadCrumbs() {
  const stacks = useFuseSelector(selectStackNavigation);

  return (
    <div>
      {stacks?.map((stack) => (
        <Link key={stack.path} to={stack.path} className="mx-5">
          {stack.title}
        </Link>
      ))}
    </div>
  );
}

export default DynamicBreadCrumbs;
