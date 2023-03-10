import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Backdrop, ModalWrapper } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      console.log('close');
      this.props.onCloseByEscape();
    }
  };

  handleBackDrop = evt => {
    const clickBackdrop = evt.target.id;
    if (clickBackdrop === 'backdrop') {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImg, tags, closeModal } = this.props;
    return createPortal(
      <Backdrop id="backdrop" onClick={closeModal}>
        <ModalWrapper>
          <img src={largeImg} alt={tags} />
        </ModalWrapper>
      </Backdrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  closeModal: PropTypes.func,
};
