import {
  GalleryList,
  GalleryListItem,
  GalleryListImage,
} from './ImageGallery.styled';

export const ImageGallery = ({ images, getUrl }) => {
  return (
    <>
      <GalleryList>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <GalleryListItem key={id}>
            <GalleryListImage
              src={webformatURL}
              alt={tags}
              onClick={() => getUrl(largeImageURL, tags)}
            />
          </GalleryListItem>
        ))}
      </GalleryList>
    </>
  );
};
