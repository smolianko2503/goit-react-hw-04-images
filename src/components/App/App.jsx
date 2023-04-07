import { useState } from 'react';

import { Toaster } from 'react-hot-toast';

import { GlobalStyle } from 'components/GlobalStyle';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';

export const App = () => {
  const [textSearch, setTextSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState('');
  const [modalImgAlt, setModalImgAlt] = useState('');

  const handleSubmitForm = inputValue => {
    setTextSearch(inputValue.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getModalProps = (src, alt, isModalOpen) => {
    setModalImgSrc(src);
    setModalImgAlt(alt);
    setIsModalOpen(isModalOpen);

    openModal();
  };

  return (
    <div>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      <Searchbar onSubmitForm={handleSubmitForm}></Searchbar>
      <ImageGallery
        request={textSearch}
        getModalData={getModalProps}
      ></ImageGallery>
      {isModalOpen === true && (
        <Modal
          src={modalImgSrc}
          alt={modalImgAlt}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
        ></Modal>
      )}
      <GlobalStyle></GlobalStyle>
    </div>
  );
};
