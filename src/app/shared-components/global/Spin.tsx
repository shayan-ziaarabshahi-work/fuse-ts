import { Box, Fade } from '@mui/material';
import { FC, ReactNode } from 'react';

interface SpinProps {
  children: ReactNode;
  spinning?: boolean;
  indicator?: ReactNode;
}

const Spin: FC<SpinProps> = ({
  spinning = true,
  indicator = (
    <div id="spinner" className="spinner-primary !mt-0">
      <Box className="bounce1" />
      <Box className="bounce2" />
      <Box className="bounce3" />
    </div>
  ),
  children,
}) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Fade in={spinning}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 4,
            opacity: 1,
            display: 'block',
            width: '100%',
            height: '100%',
            maxHeight: 400,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {indicator}
          </Box>
        </Box>
      </Fade>
      <Box
        sx={(theme) => ({
          position: 'relative',
          transition: `all 250ms ${theme.transitions.easing.easeInOut}`,
          opacity: spinning ? 0.4 : 1,
          userSelect: spinning ? 'none' : undefined,
          pointerEvents: spinning ? 'none' : 'auto',
          '&::after': {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 10,
            height: '100%',
            background: theme.palette.common.white,
            opacity: spinning ? 0.3 : 0,
            visibility: spinning ? 'visible' : 'hidden',
            transition: `all 250ms ${theme.transitions.easing.easeInOut}`,
            content: '""',
            pointerEvents: spinning ? 'none' : 'auto',
          },
        })}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Spin;
