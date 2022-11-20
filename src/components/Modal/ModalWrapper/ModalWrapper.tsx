import IModalWrapper from './ModalWrapper.types';

function ModalWrapper({ onCloseModal, children }: IModalWrapper) {
  return (
    <>
      <div onClick={onCloseModal} className="modalOverlay bg-blue-gray-300/[0.4]" />
      <div className="modalInner translate-x-[-50%] translate-y-[-50%] sm:w-[500px] sm:p-[40px]">
        <span
          className="material-icons absolute top-[10px] right-[10px] text-slate-900 cursor-pointer"
          onClick={onCloseModal}
        >
          close
        </span>
        {children}
      </div>
    </>
  );
}

export default ModalWrapper;
