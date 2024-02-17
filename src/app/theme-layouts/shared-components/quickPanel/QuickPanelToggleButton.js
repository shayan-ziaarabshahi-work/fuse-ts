import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useFuseDispatch } from 'src/app/utils/hooks/useStore';
import { toggleQuickPanel } from './store/stateSlice';

function QuickPanelToggleButton(props) {
  const dispatch = useFuseDispatch();

  return (
    <IconButton className="w-40 h-40" onClick={(ev) => dispatch(toggleQuickPanel())} size="large">
      {props.children}
    </IconButton>
  );
}

QuickPanelToggleButton.defaultProps = {
  children: <FuseSvgIcon>heroicons-outline:bookmark</FuseSvgIcon>,
};

export default QuickPanelToggleButton;
