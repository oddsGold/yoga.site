import React from 'react';
import MultiSelectWithSearch from '../MultiSelectWithSearch.jsx';

const FormikMultiSelectSearch = ({ field, form, options, ...props }) => {
  const error = form?.errors?.[field.name];

  const handleChange = (selectedOptions) => {
    form.setFieldValue(field.name, selectedOptions);
  };

  return (
    <div>
      <MultiSelectWithSearch
        {...field}
        {...props}
        options={options}
        value={field.value}
        onChange={handleChange}
        error={Boolean(error)}
        helperText={error ? form.errors[field.name] : ''}
      />
      {error && <p className="mt-1.5 text-xs text-error-500">{error}</p>}
    </div>
  );
};

export default FormikMultiSelectSearch;
