import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';

interface UseCopyProps {
  value: string;
  successMessage?: string;
  failureMessage?: string;
}

export default function useCopy({
  value,
  successMessage = 'با موفقیت کپی شد !',
  failureMessage = 'مرورگر شما کپی را پشتیبانی نمیکند !',
}: UseCopyProps): ({}: UseCopyProps) => void {
  const dispatch = useDispatch();

  const copy = ({
    value: valueToCopy,
    successMessage: successMessageToShow,
    failureMessage: failureMessageToShow,
  }: UseCopyProps) => {
    if ('clipboard' in navigator) {
      navigator.clipboard.writeText(value || valueToCopy).then(() => {
        dispatch(
          showMessage({
            variant: 'success',
            message: successMessage || successMessageToShow,
          })
        );
      });
    } else {
      dispatch(
        showMessage({
          variant: 'error',
          message: failureMessage || failureMessageToShow,
        })
      );
    }
  };

  return copy;
}
