import { createPortal } from 'react-dom';
import { Overlay, Modal } from './Modal.styled';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const ModalWindow = ({ url, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Modal>
        <img src={url.imageUrl} alt={url.alt} />
      </Modal>
    </Overlay>,
    modalRoot
  );
};
