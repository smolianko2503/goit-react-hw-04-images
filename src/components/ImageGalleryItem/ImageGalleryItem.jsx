import { GalleryItem, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image: { largeImageURL, tags } }) => {
  return (
    <GalleryItem>
      <Image src={largeImageURL} alt={tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};
