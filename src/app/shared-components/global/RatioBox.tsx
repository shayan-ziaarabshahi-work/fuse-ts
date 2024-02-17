import { Box, useTheme, BoxProps, Breakpoint } from '@mui/material';
import { FC } from 'react';
import { calculateRatioPercent } from 'src/app/utils';

type AspectRatioType = {
  aspectRatio:
    | string
    | {
        [key in Breakpoint]: string;
      };
};

const RatioBox: FC<AspectRatioType & BoxProps> = ({ aspectRatio, sx, ...props }) => {
  const theme = useTheme();
  const aspectRatioY =
    typeof aspectRatio === 'string'
      ? { paddingBottom: `${calculateRatioPercent(aspectRatio)}%` }
      : {
          ...Object.fromEntries(
            Object.entries(aspectRatio).map(([brakepoint, aspectRatioValue]) => [
              theme.breakpoints.up(brakepoint as Breakpoint),
              { paddingBottom: `${calculateRatioPercent(aspectRatioValue as string)}%` },
            ])
          ),
        };

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        ...aspectRatioY,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          '&>*:first-of-type': {
            flexGrow: 1,
            minWidth: '100%',
          },
          ...sx,
        }}
        {...props}
      />
    </Box>
  );
};

export default RatioBox;
