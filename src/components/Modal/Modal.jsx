import React from 'react';

import { Overlay, ModalBox, Img } from './Modal.styled';

import PropTypes from 'prop-types';

export class Modal extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeOnEscape);
    document.addEventListener('click', this.closeOnClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeOnEscape);
    document.removeEventListener('click', this.closeOnClick);
  }

  closeOnEscape = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  closeOnClick = event => {
    if (
      this.props.isModalOpen === true &&
      event.target.src !== this.props.src
    ) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <Overlay>
        <ModalBox>
          <Img src={this.props.src} alt={this.props.alt} />
        </ModalBox>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired
};
