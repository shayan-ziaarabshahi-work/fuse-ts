import { Typography, TypographyProps } from '@mui/material';
import { FC, ReactNode } from 'react';

const BoldText: FC<{ text: ReactNode } & TypographyProps> = ({ text, ...props }) => (
  <Typography component="span" variant="subtitle2" {...props}>
    {text}
  </Typography>
);
export default BoldText;
