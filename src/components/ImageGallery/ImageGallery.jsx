import { Component } from 'react';

import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

import { getImages } from 'components/ImageApi/getImage';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Gallery } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    images: null,
    page: 1,
    toHideButton: true,
    error: '',
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.request !== this.props.request) {
      this.fetchImages(this.props.request, 1);
    }

    if (prevState.page !== this.state.page) {
      this.fetchImagesLoadMore(this.props.request, this.state.page);
    }
  }

  fetchImages = async (request, page) => {
    try {
      this.setState({
        status: 'pending',
      });

      const imagesData = await getImages(request.trim(), page);
      if (imagesData.hits.length === 0) {
        this.setState({ status: 'rejected' });
        return toast(
          'No images were found for your request. Try searching for another query...'
        );
      } else {
        this.setState({ images: imagesData.hits, status: 'resolved' });
        if (imagesData.total > 12) {
          this.setState({ toHideButton: false });
        } else {
          this.setState({ toHideButton: true });
          return toast('These are all images by your request...');
        }
      }
    } catch (error) {
      this.setState({ error: error, status: 'rejected' });
    }
  };

  resetPage = () => {
    this.setState({ page: 1 });
  };

  fetchImagesLoadMore = async (request, page) => {
    try {
      const imagesData = await getImages(request.trim(), page);
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...imagesData.hits],
        };
      });
      if (Math.ceil(imagesData.total / 12) === this.state.page) {
        this.setState({ toHideButton: true });
        return toast('These are all images by your request...');
      }
    } catch (error) {
      this.setState({ error: error, status: 'rejected' });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  onClick = event => {
    if (!event.target.src) {
      return;
    } else {
      const modalProps = {
        src: event.target.src,
        alt: event.target.alt,
        isModalOpen: true,
      };
      this.props.getModalData(modalProps);
    }
  };

  render() {
    if (this.state.status === 'pending') {
      return <Loader></Loader>;
    }
    if (this.state.status === 'resolved') {
      return (
        <div>
          <Gallery onClick={this.onClick}>
            {this.state.images.map(item => {
              return (
                <ImageGalleryItem key={item.id} image={item}></ImageGalleryItem>
              );
            })}
          </Gallery>

          {this.state.toHideButton === false && (
            <Button onLoadMore={this.onLoadMore}></Button>
          )}
        </div>
      );
    }

    if (this.state.status === 'rejected') {
      return <h2>{this.state.error}</h2>;
    }
  }
}

ImageGallery.propTypes = {
  request: PropTypes.string.isRequired,
  getModalData: PropTypes.func.isRequired,
};
