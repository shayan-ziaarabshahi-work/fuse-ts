import { amber, blue, green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useFuseDispatch, useFuseSelector } from 'src/app/utils/hooks/useStore';
import {
  hideMessage,
  selectFuseMessageOptions,
  selectFuseMessageState,
} from 'app/store/fuse/messageSlice';
import FuseSvgIcon from '../FuseSvgIcon';

const StyledSnackbar = styled(Snackbar)(({ theme, variant }) => ({
  '& .FuseMessage-content': {
    ...(variant === 'success' && {
      backgroundColor: green[600],
      color: '#FFFFFF',
    }),

    ...(variant === 'error' && {
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.getContrastText(theme.palette.error.dark),
    }),

    ...(variant === 'info' && {
      backgroundColor: blue[600],
      color: '#FFFFFF',
    }),

    ...(variant === 'warning' && {
      backgroundColor: amber[600],
      color: '#FFFFFF',
    }),
  },
}));

// const variantIcon = {
//   success: 'check_circle',
//   warning: 'warning',
//   error: 'error_outline',
//   info: 'info',
// };

function FuseMessage(props) {
  const dispatch = useFuseDispatch();
  const state = useFuseSelector(selectFuseMessageState);
  const options = useFuseSelector(selectFuseMessageOptions);

  return (
    <StyledSnackbar
      {...options}
      open={state}
      onClose={() => dispatch(hideMessage())}
      ContentProps={{
        variant: 'body2',
        headlineMapping: {
          body1: 'div',
          body2: 'div',
        },
      }}
    >
      <SnackbarContent
        className="FuseMessage-content"
        message={
          <div className="flex items-center">
            {/* {variantIcon[options.variant] && (
              <FuseSvgIcon color="inherit">{variantIcon[options.variant]}</FuseSvgIcon>
            )} */}
            <Typography className="mx-8">{options.message}</Typography>
          </div>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => dispatch(hideMessage())}
            size="large"
          >
            <FuseSvgIcon>heroicons-outline:x</FuseSvgIcon>
          </IconButton>,
        ]}
      />
    </StyledSnackbar>
  );
}

export default memo(FuseMessage);
