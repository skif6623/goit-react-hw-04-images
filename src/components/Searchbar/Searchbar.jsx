import { Formik, Field } from 'formik';
import {
  Search,
  SearchForm,
  SearchInput,
  SearchButton,
  SearchButtonLabel,
} from './Searchbar.styled';

const initialValues = {
  querry: '',
};

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values.querry);
    resetForm();
  };
  return (
    <Search>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <SearchForm>
          <SearchButton type="submit">
            <SearchButtonLabel></SearchButtonLabel>
          </SearchButton>

          <Field
            as={SearchInput}
            type="text"
            name="querry"
            autoComplete="true"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </Search>
  );
};
