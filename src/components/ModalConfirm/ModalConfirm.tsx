import ModalWrapper from '../ModalWrapper/ModalWrapper';
import { IModalConfirm } from './ModalConfirm.types';
import { Button } from '@material-tailwind/react';

const ModalConfirm = (props: IModalConfirm) => {
  const { title, confirmation, onCloseModal, onHandleEvent } = props;

  const handleConfirm = () => {
    onCloseModal();
    onHandleEvent();
  };

  return (
    <ModalWrapper onCloseModal={onCloseModal}>
      <div className="flex flex-col w-full sm:w-full h-full gap-y-[25px]">
        <h2 className="text-[24px] mt-[20px]">Delete {title}?</h2>
        <p className="text-[18px]">{confirmation}</p>
        <div className="flex justify-end gap-[10px] w-full">
          <Button variant="outlined" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Delete</Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ModalConfirm;
