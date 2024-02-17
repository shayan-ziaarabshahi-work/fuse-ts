import IconButton from '@mui/material/IconButton';
import { useFuseDispatch } from 'src/app/utils/hooks/useStore';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { toggleChatPanel } from './store/stateSlice';

const ChatPanelToggleButton = (props) => {
  const dispatch = useFuseDispatch();

  return (
    <IconButton className="w-40 h-40" onClick={(ev) => dispatch(toggleChatPanel())} size="large">
      {props.children}
    </IconButton>
  );
};

ChatPanelToggleButton.defaultProps = {
  children: <FuseSvgIcon>heroicons-outline:chat</FuseSvgIcon>,
};

export default ChatPanelToggleButton;
