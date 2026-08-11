import { useEffect, useRef, type ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
  isOpen: boolean | undefined;
  onClose: () => void;
};

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const modal = useRef<HTMLDialogElement>(null);

  // check to see if the modal is triggered for open or close.
  useEffect(() => {
    if (isOpen) {
      modal.current?.showModal();
    } else {
      modal.current?.close();
    }
  }, [isOpen]); // Dependency will check if isOpen is triggered

  // Do not render anything if modal is not triggered
  if (!isOpen) return null;

  return (
    // m-auto centers the dialog — <dialog> normally centers itself with margin: auto,
    // but Tailwind's Preflight resets margins to 0, so we restore it.
    <dialog
      className='m-auto rounded-lg p-6 bg-white backdrop:bg-black/50'
      onClose={onClose}
      ref={modal}
    >
      {children}
    </dialog>
  );
};
