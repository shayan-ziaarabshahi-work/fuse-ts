import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { TbPlugConnectedX } from 'react-icons/tb';
import { Box, Button } from '@mui/material';
import { HiRefresh } from 'react-icons/hi';

interface ErrorComponentProps {
  error?: Error | null;
  tryToSolve: () => void;
}

function ErrorComponent({ error, tryToSolve }: ErrorComponentProps) {
  return (
    <div className={`flex flex-col px-16 h-full w-full justify-center`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
      >
        <Box className="flex justify-center mb-20">
          <TbPlugConnectedX fontSize={100} />
        </Box>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
      >
        <Typography
          variant="h1"
          className="text-xl font-extrabold tracking-tight leading-tight text-center"
        >
          خطا در برقراری ارتباط
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
      >
        <Typography
          variant="h5"
          color="text.secondary"
          className="mt-8 text-lg md:text-xl font-medium tracking-tight text-center"
        >
          خطایی در ارتباط با سرور رخ داده است
        </Typography>
      </motion.div>

      <Button
        className="mx-auto font-normal mt-48 px-32"
        onClick={tryToSolve}
        endIcon={<HiRefresh />}
      >
        تلاش مجدد
      </Button>
    </div>
  );
}

export default ErrorComponent;
