import { Formik, Form } from 'formik';
import { toast } from 'react-hot-toast';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';

import { Header, Field, Button } from './Searchbar.styled';

export const Searchbar = ({ onSubmitForm }) => {
  const handleSubmit = (values, actions) => {
    const resetPage = 1;
    if (values.value === '') {
      return toast.error('Please enter the query parameters!');
    } else {
      onSubmitForm(values, resetPage);
      actions.resetForm();
    }
  };
  return (
    <Header>
      <Formik
        initialValues={{
          value: '',
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Button type="submit">
            <FcSearch />
          </Button>
          <Field
            name="value"
            type="text"
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
