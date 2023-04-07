import { useEffect } from 'react';

import { Overlay, ModalBox, Img } from './Modal.styled';

import PropTypes from 'prop-types';

export const Modal = ({ src, alt, closeModal, isModalOpen }) => {
  useEffect(() => {
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('click', closeOnClick);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('click', closeOnClick);
    };
  });

  const closeOnEscape = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  const closeOnClick = event => {
    if (isModalOpen === true && event.target.src !== src) {
      closeModal();
    }
  };

  return (
    <Overlay>
      <ModalBox>
        <Img src={src} alt={alt} />
      </ModalBox>
    </Overlay>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};
