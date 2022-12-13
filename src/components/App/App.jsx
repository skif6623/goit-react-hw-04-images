import React, { Component } from 'react';
import { getImages } from '../../servise/api';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { GalleryApp } from './App.styled';
import { GlobalStyle } from '../../GlobalStyles';
import { ModalWindow } from '../Modal/Modal';
import { Button } from '../Button/Button';
import BeatLoader from 'react-spinners/BeatLoader';
import toast, { Toaster } from 'react-hot-toast';

const override = {
  display: 'block',
  margin: '0 auto',
};

export class App extends Component {
  state = {
    page: 1,
    querry: '',
    images: [],
    url: null,
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { page, querry } = this.state;

    if (prevState.page !== page || prevState.querry !== querry) {
      try {
        this.setState({ isLoading: true });
        const images = await getImages(querry, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
        }));
      } catch (error) {
        console.log(error);
        toast.error('Помилка, перезагрузіть сторінку');
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }
  setQuerryToState = querry => {
    if (querry === '') {
      toast.error('Введіть ключове слово');
      return;
    }
    this.setState({
      images: [],
      querry,
      page: 1,
    });
  };

  getModalimageUrl = (imageUrl, alt) => {
    this.setState({
      url: {
        imageUrl,
        alt,
      },
    });
  };

  closeModal = () => {
    this.setState({ url: null });
  };

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, url, isLoading } = this.state;

    return (
      <GalleryApp>
        <Searchbar onSubmit={this.setQuerryToState} />
        <BeatLoader
          color="#3f51b5"
          loading={isLoading}
          cssOverride={override}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <ImageGallery images={images} getUrl={this.getModalimageUrl} />
        {images.length > 0 && <Button incrementPage={this.incrementPage} />}
        {url && <ModalWindow url={url} closeModal={this.closeModal} />}
        <Toaster position="top-right" />
        <GlobalStyle />
      </GalleryApp>
    );
  }
}
