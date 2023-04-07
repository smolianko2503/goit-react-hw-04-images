import { useState, useEffect } from 'react';

import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

import { getImages } from 'components/ImageApi/getImage';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ request, getModalData }) => {
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [toHideButton, setToHideButton] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState('');

  const fetchImages = async (request, page) => {
    try {
      setPage(1);
      setStatus('pending');
      const imagesData = await getImages(request.trim(), page);
      if (imagesData.hits.length === 0) {
        setStatus('rejected');
        return toast(
          'No images were found for your request. Try searching for another query...'
        );
      } else {
        setImages(imagesData.hits);
        setStatus('resolved');
        if (imagesData.total > 12) {
          setToHideButton(false);
        } else {
          setToHideButton(true);
          return toast('These are all images by your request...');
        }
      }
    } catch (error) {
      setError(error);
      setStatus('rejected');
    }
  };

  const fetchImagesLoadMore = async (request, page) => {
    try {
      const imagesData = await getImages(request.trim(), page);
      setImages(prevState => {
        return [...prevState, ...imagesData.hits];
      });
      if (Math.ceil(imagesData.total / 12) === page) {
        setToHideButton(true);
        return toast('These are all images by your request...');
      }
    } catch (error) {
      setError(error);
      setStatus('rejected');
    }
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
    setQuery(request);
  };

  const onClick = event => {
    if (!event.target.src) {
      return;
    } else {
      getModalData(event.target.src, event.target.alt, true);
    }
  };

  useEffect(() => {
    if (request !== query) {
      fetchImages(request, page);
    }

    if (page > 1 && request === query) {
      fetchImagesLoadMore(request, page);
    }
  }, [request, page, query]);


  

  if (status === 'pending') {
    return <Loader></Loader>;
  }
  if (status === 'resolved') {
    return (
      <div>
        <Gallery onClick={onClick}>
          {images.map(item => {
            return (
              <ImageGalleryItem key={item.id} image={item}></ImageGalleryItem>
            );
          })}
        </Gallery>

        {toHideButton === false && <Button onLoadMore={onLoadMore}></Button>}
      </div>
    );
  }

  if (status === 'rejected') {
    return <h2>{error}</h2>;
  }
};

ImageGallery.propTypes = {
  request: PropTypes.string.isRequired,
  getModalData: PropTypes.func.isRequired,
};
