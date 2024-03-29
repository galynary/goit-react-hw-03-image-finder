import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppWrapper } from './App.slyled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { API } from '../services/api';
import { Loader } from './Loader/Loader';
import { ButtonLoadMore } from './ButtonLoadMore/ButtonLoadMore';
import { Modal } from './Modal/Modal';

export class App extends Component {
  static defaultProps = { PER_PAGE: 12 };

  state = {
    imageName: '',
    images: [],
    loading: false,
    visibleBtn: false,
    largeImg: '',
    tags: '',
    page: 1,
    totalPages: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { imageName, page } = this.state;
    const { PER_PAGE } = this.props;

    if (prevState.imageName !== imageName || prevState.page !== page) {
      this.setState({ loading: true });
      try {
        const data = await API.getImages(imageName, page, PER_PAGE);

        const { hits, totalHits } = data;
        this.setState(({ images }) => ({
          images: [...images, ...hits],
          visibleBtn: page < Math.ceil(totalHits / PER_PAGE),
        }));
        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images`);
          window.scroll(0, 0);
        }
      } catch {
        toast.error(
          `Sorry, there are no images "${imageName}". Please try again.`
        );
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  }

  onSubmitForm = value => {
    if (value !== this.state.imageName) {
      this.setState({
        imageName: value,
        images: [],
        visibleBtn: false,
        page: 1,
        totalPages: 0,
      });
    } else {
      toast.warn('The new search must be different from the current search');
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onSelectedImage = ({ largeImageURL, tags }) => {
    this.setState({ largeImg: largeImageURL, tags });
  };

  onCloseModal = () => {
    this.setState({ largeImg: '' });
  };

  render() {
    const { images, loading, visibleBtn, largeImg, tags } = this.state;

    return (
      <AppWrapper>
        <Searchbar onSubmit={this.onSubmitForm} />
        {loading && <Loader />}
        <ImageGallery images={images} onSelected={this.onSelectedImage} />
        {visibleBtn && (
          <ButtonLoadMore loading={loading} onLoadMore={this.onLoadMore} />
        )}
        {largeImg && (
          <Modal
            largeImg={largeImg}
            tags={tags}
            onCloseModal={this.onCloseModal}
          />
        )}
        <ToastContainer autoClose={3000} />
      </AppWrapper>
    );
  }
}

App.propTypes = {
  PER_PAGE: PropTypes.number.isRequired,
};
