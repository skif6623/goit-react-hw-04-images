import React, { Component } from 'react';
import { getImages } from '../../servise/api';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { GalleryApp } from './App.styled';
import { GlobalStyle } from '../../GlobalStyles';
import { ModalWindow } from '../Modal/Modal';
import MoonLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: 'auto',
  borderColor: 'blue',
};

export class App extends Component {
  state = {
    images: [],
    url: null,
    isLoading: false,
  };

  setImageToState = async querry => {
    if (querry === '') {
      console.log('введіть слово');
      return;
    }
    try {
      this.setState({ isLoading: true });
      const images = await getImages(querry);
      this.setState({
        images: images.hits,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
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

  render() {
    const { images, url, isLoading } = this.state;

    return (
      <GalleryApp>
        <Searchbar onSubmit={this.setImageToState} />
        <MoonLoader
          loading={isLoading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <ImageGallery images={images} getUrl={this.getModalimageUrl} />
        {url && <ModalWindow url={url} closeModal={this.closeModal} />}
        <GlobalStyle />
      </GalleryApp>
    );
  }
}
