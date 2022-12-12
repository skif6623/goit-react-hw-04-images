import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import { Overlay, Modal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class ModalWindow extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { url } = this.props;

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <Modal>
          <img src={url.imageUrl} alt={url.alt} />
        </Modal>
      </Overlay>,
      modalRoot
    );
  }
}
