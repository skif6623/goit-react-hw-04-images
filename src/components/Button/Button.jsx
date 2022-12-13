import { LoadMore } from './Button.styled';

export const Button = ({ incrementPage }) => {
  return (
    <LoadMore type="button" onClick={incrementPage}>
      Load More
    </LoadMore>
  );
};
