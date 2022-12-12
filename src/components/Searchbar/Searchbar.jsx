import { Formik, Form, Field } from 'formik';
import { SearchField } from './Searchbar.styled';

const initialValues = {
  querry: '',
};

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = async (values, { resetForm }) => {
    await onSubmit(values.querry);
    resetForm();
  };
  return (
    <SearchField className="searchbar">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <Field
            className="input"
            type="text"
            name="querry"
            autoComplete="true"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </SearchField>
  );
};
