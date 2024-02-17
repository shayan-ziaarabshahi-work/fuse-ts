import { Typography, TypographyProps } from '@mui/material';
import { splitAmount } from 'src/app/utils';
import BoldText from './BoldText';
import { FC } from 'react';

const DisplayPrice: FC<{ value: string | number } & TypographyProps> = ({ value, ...props }) => (
  <Typography color="text.secondary" variant="caption" component="span" {...props}>
    <BoldText text={splitAmount(value || 0)} color="text.primary" />
    &nbsp; ریال
  </Typography>
);
export default DisplayPrice;
