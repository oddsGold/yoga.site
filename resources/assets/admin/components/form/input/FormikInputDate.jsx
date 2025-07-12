import React from 'react';
import DatePicker from '../date-picker.jsx';

const FormikInputDate = ({ field, form, ...props }) => {
  const error = form?.touched?.[field.name] && form?.errors?.[field.name];

  const handleDateChange = (selectedDates) => {
    const date = selectedDates[0] || null;
    form.setFieldValue(field.name, date);
  };

  return (
    <DatePicker
      {...props}
      id={field.name}
      defaultDate={field.value}
      onChange={handleDateChange}
      error={Boolean(error)}
      hint={error}
      label={props.label}
      placeholder={props.placeholder}
    />
  );
};

export default FormikInputDate;
