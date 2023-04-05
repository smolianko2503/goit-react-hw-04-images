import React, { Component } from 'react';

import { Toaster } from 'react-hot-toast';

import { GlobalStyle } from 'components/GlobalStyle';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    textSearch: '',
    isModalOpen: false,
    modalImgSrc: '',
    modalImgAlt: '',
  };

  handleSubmitForm = inputValue => {
    this.setState({ textSearch: inputValue.value });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  getModalProps = modalProps => {
    this.setState({
      modalImgSrc: modalProps.src,
      modalImgAlt: modalProps.alt,
      isModalOpen: modalProps.isModalOpen,
    });
    this.openModal();
  };

  render() {
    return (
      <div>
        <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
        <Searchbar onSubmitForm={this.handleSubmitForm}></Searchbar>
        <ImageGallery
          request={this.state.textSearch}
          getModalData={this.getModalProps}
        ></ImageGallery>
        {this.state.isModalOpen === true && (
          <Modal
            src={this.state.modalImgSrc}
            alt={this.state.modalImgAlt}
            closeModal={this.closeModal}
            isModalOpen={this.state.isModalOpen}
          ></Modal>
        )}
        <GlobalStyle></GlobalStyle>
      </div>
    );
  }
}
