import { Box, Button, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React, { MouseEvent, ReactNode } from 'react';
import { HiRefresh, HiOutlineExclamation } from 'react-icons/hi';
import ErrorDisplayer from './ErrorDisplayer';

interface ErrorContainerProps {
  icon: ReactNode;
  iconColor: string;
  title: string;
  message: string;
  submitText: string;
  submitClick: (event: MouseEvent<HTMLButtonElement>) => void;
  noSubmit: boolean;
  error: Error;
}

function ErrorContainer({
  icon,
  iconColor,
  title = 'خطایی پیش آمد',
  message,
  submitText = 'تلاش مجدد',
  submitClick,
  noSubmit,
  error,
}: Partial<ErrorContainerProps>) {
  const [showError, setShowError] = React.useState(false);

  const handleError = () => {
    setShowError(!showError);
  };

  return (
    <Box
      sx={{ backgroundColor: 'background.default' }}
      className="w-full flex flex-grow flex-col py-16 px-32"
    >
      {showError && error ? (
        <ErrorDisplayer error={error} />
      ) : (
        <div className="flex-grow flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box color={iconColor || 'error.main'} className="flex justify-center">
              {icon}
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h4" className="text-center font-800">
              {title}
            </Typography>

            <Typography
              variant="body2"
              align="justify"
              className="mb-40 mt-12 text-center"
              lineHeight={1.75}
            >
              {message}
            </Typography>
          </motion.div>
        </div>
      )}

      <div>
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Grid container spacing={1.75}>
            {process.env.REACT_APP_RUNTIME_MODE !== 'production' && (
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  startIcon={<HiOutlineExclamation />}
                  size="large"
                  onClick={handleError}
                >
                  {showError ? 'مخفی کردن خطا' : 'نمایش خطا'}
                </Button>
              </Grid>
            )}

            {!noSubmit && (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<HiRefresh />}
                  size="large"
                  onClick={submitClick}
                >
                  {submitText}
                </Button>
              </Grid>
            )}
          </Grid>
        </motion.div>
      </div>
    </Box>
  );
}

export default ErrorContainer;
