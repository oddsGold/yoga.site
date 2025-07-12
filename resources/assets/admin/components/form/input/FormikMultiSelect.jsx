import React from 'react';
import MultiSelect from '../MultiSelect.jsx';

const FormikMultiSelect = ({ field, form, options, ...props }) => {
  const error = form?.touched?.[field.name] && form?.errors?.[field.name];

  const handleChange = (selectedOptions) => {
    form.setFieldValue(field.name, selectedOptions);
  };

  return (
    <div>
      <MultiSelect
        {...field}
        {...props}
        options={options}
        value={field.value}
        onChange={handleChange}
        error={Boolean(error)}
        helperText={error}
      />
      {error && <p className="mt-1.5 text-xs text-error-500">{error}</p>}
    </div>
  );
};

export default FormikMultiSelect;
