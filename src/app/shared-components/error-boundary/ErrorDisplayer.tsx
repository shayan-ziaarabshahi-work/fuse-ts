import { motion } from 'framer-motion';
import { Typography } from '@mui/material';

interface ErrorDisplayerProps {
  error: Error;
}

export default function ErrorDisplayer({ error }: ErrorDisplayerProps) {
  return (
    <div className="flex-grow flex flex-col justify-center mx-20">
      <motion.div
        initial={{ opacity: 0, x: -70 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Typography variant="h5" align="justify" lineHeight={1.75} dir="ltr">
          Message :
        </Typography>
        <Typography
          variant="body2"
          align="justify"
          className="text-right break-words"
          lineHeight={1.75}
        >
          {error.message}
        </Typography>

        <br />

        <Typography variant="h5" align="justify" lineHeight={1.75} dir="ltr">
          Name :
        </Typography>
        <Typography
          variant="body2"
          align="justify"
          className="text-right break-words"
          lineHeight={1.75}
        >
          {error.name}
        </Typography>

        <br />

        <Typography variant="h5" align="justify" lineHeight={1.75} dir="ltr">
          Stack :
        </Typography>
        <Typography
          variant="body2"
          align="justify"
          className="break-words"
          lineHeight={1.75}
          dir="ltr"
        >
          {error.stack}
        </Typography>
      </motion.div>
    </div>
  );
}
