import type { ReactNode } from 'react';

export type ModalProps = {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};
