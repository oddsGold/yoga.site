import React from 'react';
import Input from './InputField.jsx';

const FormikInput = ({ field, form, ...props }) => {
  const error = form?.touched?.[field.name] && form?.errors?.[field.name];
  return <Input {...field} error={Boolean(error)} hint={error} {...props} />;
};

export default FormikInput;
