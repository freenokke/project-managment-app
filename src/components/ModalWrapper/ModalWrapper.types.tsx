import { ReactNode } from 'react';

interface IModalWrapper {
  children: ReactNode;
  onCloseModal: () => void;
}

export default IModalWrapper;
