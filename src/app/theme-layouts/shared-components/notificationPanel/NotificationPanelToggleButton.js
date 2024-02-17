import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useFuseSelector, useFuseDispatch } from 'src/app/utils/hooks/useStore';
import withReducer from 'app/store/withReducer';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import reducer from './store';
import { selectNotifications } from './store/dataSlice';
import { toggleNotificationPanel } from './store/stateSlice';

function NotificationPanelToggleButton(props) {
  const notifications = useFuseSelector(selectNotifications);

  const dispatch = useFuseDispatch();

  return (
    <IconButton
      className="w-40 h-40"
      onClick={(ev) => dispatch(toggleNotificationPanel())}
      size="large"
    >
      <Badge color="secondary" variant="dot" invisible={notifications.length === 0}>
        {props.children}
      </Badge>
    </IconButton>
  );
}

NotificationPanelToggleButton.defaultProps = {
  children: <FuseSvgIcon>heroicons-outline:bell</FuseSvgIcon>,
};

export default withReducer('notificationPanel', reducer)(NotificationPanelToggleButton);
