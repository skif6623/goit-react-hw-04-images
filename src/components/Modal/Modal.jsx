import { Overlay, Modal } from './Modal.styled';

export const ModalWindow = () => {
  return (
    <Overlay>
      <Modal class="modal">
        <p>Привіт я модалка</p>
        <img src="" alt="" />
      </Modal>
    </Overlay>
  );
};
