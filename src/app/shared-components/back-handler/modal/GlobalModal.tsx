import { useFuseSelector } from 'src/app/utils/hooks/useStore';
import ModalComponent from './ModalComponent';

const GlobalModal = () => {
  const modalPack = useFuseSelector((state) => state.modal);

  return (
    <>
      {modalPack.map(({ key, ...props }, index) => (
        <ModalComponent key={key} {...props} index={index} />
      ))}
    </>
  );
};

export default GlobalModal;
