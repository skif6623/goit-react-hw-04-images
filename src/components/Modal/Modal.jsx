import { createPortal } from 'react-dom';
import { Overlay, Modal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const ModalWindow = ({ closeModal, url }) => {
  return createPortal(
    <Overlay>
      <Modal>
        <img src={url.imageUrl} alt={url.alt} />
        <button type="button" onClick={closeModal}>
          Закрити
        </button>
      </Modal>
    </Overlay>,
    modalRoot
  );
};
