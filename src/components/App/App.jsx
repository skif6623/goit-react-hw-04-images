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
import { useState } from 'react';
import { useEffect } from 'react';

const override = {
  display: 'block',
  margin: '0 auto',
};

export const App = () => {
  const [page, setPage] = useState(1);
  const [querry, setQuerry] = useState('');
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchQuerry() {
      try {
        const images = await getImages(querry, page);
        setImages(prevImages => [...prevImages, ...images.hits]);
      } catch (error) {
        toast.error('Помилка, перезагрузіть сторінку');
      }
    }
    fetchQuerry();
  }, [page]);

  const setQuerryToState = querry => {
    if (querry === '') {
      toast.error('Введіть ключове слово');
      return;
    }
    setImages([]);
    setQuerry(querry);
    setPage(1);
  };

  const getModalimageUrl = (imageUrl, alt) => {
    setUrl({ imageUrl, alt });
  };

  const closeModal = () => {
    setUrl(null);
  };

  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showButton = page < totalPages;

  return (
    <GalleryApp>
      <Searchbar onSubmit={setQuerryToState} />
      <BeatLoader
        color="#3f51b5"
        loading={isLoading}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <ImageGallery images={images} getUrl={getModalimageUrl} />
      {showButton && <Button incrementPage={incrementPage} />}
      {url && <ModalWindow url={url} closeModal={closeModal} />}
      <Toaster position="top-right" />
      <GlobalStyle />
    </GalleryApp>
  );
};

// export class App extends Component {
//   state = {
//     page: 1,
//     querry: '',
//     images: [],
//     url: null,
//     isLoading: false,
//     totalPages: null,
//   };

//   async componentDidUpdate(_, prevState) {
//     const { page, querry } = this.state;

//     if (prevState.page !== page || prevState.querry !== querry) {
//       try {
//         this.setState({ isLoading: true });

//         const images = await getImages(querry, page);

//         images.hits.length === 0
//           ? toast.error('Зображень не знайдено')
//           : this.setState(prevState => ({
//               images: [...prevState.images, ...images.hits],
//               totalPages: Math.ceil(images.total / 12),
//             }));
//       } catch (error) {
//         console.log(error);
//         toast.error('Помилка, перезагрузіть сторінку');
//       } finally {
//         this.setState({
//           isLoading: false,
//         });
//       }
//     }
//   }
//   setQuerryToState = querry => {
//     if (querry === '') {
//       toast.error('Введіть ключове слово');
//       return;
//     }
//     this.setState({
//       images: [],
//       querry,
//       page: 1,
//     });
//   };

//   getModalimageUrl = (imageUrl, alt) => {
//     this.setState({
//       url: {
//         imageUrl,
//         alt,
//       },
//     });
//   };

//   closeModal = () => {
//     this.setState({ url: null });
//   };

//   incrementPage = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { images, url, isLoading, page, totalPages } = this.state;
//     const showButton = page < totalPages;
//     console.log(showButton);

//     return (
//       <GalleryApp>
//         <Searchbar onSubmit={this.setQuerryToState} />
//         <BeatLoader
//           color="#3f51b5"
//           loading={isLoading}
//           cssOverride={override}
//           size={30}
//           aria-label="Loading Spinner"
//           data-testid="loader"
//         />
//         <ImageGallery images={images} getUrl={this.getModalimageUrl} />
//         {showButton && <Button incrementPage={this.incrementPage} />}
//         {url && <ModalWindow url={url} closeModal={this.closeModal} />}
//         <Toaster position="top-right" />
//         <GlobalStyle />
//       </GalleryApp>
//     );
//   }
// }
