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
      this.props.closeModal();
    }
  };
  onCloseByClick = evt => {
    console.log(evt.currentTarget);
    console.log(evt.target);
    if (evt.currentTarget === evt.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImg, tags, onCloseByClick } = this.props;
    return createPortal(
      <Backdrop id="backdrop" onClick={onCloseByClick}>
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
  onCloseByClick: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
