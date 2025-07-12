import React from 'react';
import Select from '../Select.jsx';

const FormikSelect = ({
  field,
  form,
  options,
  placeholder = 'Select Option',
  className = '',
  ...props
}) => {
  const error = form.touched[field.name] && form.errors[field.name];

  const handleChange = (value) => {
    form.setFieldValue(field.name, value);
  };

  return (
    <div className="relative">
      <Select
        value={field.value || ''}
        onChange={handleChange}
        onBlur={() => form.setFieldTouched(field.name, true)}
        options={options}
        placeholder={placeholder}
        className={className}
        classNamePrefix="select"
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-error-500">{form.errors[field.name]}</p>}
    </div>
  );
};

export default FormikSelect;
