import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';

const CustomSelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const { setFieldValue } = useFormikContext();
    const [showOptions, setShowOptions] = useState(false);
    const [textColor, setTextColor] = useState('#636363');

    const handleOptionClick = (value) => {
        setFieldValue(props.name, value);
        setShowOptions(false);
        setTextColor('#000');
    };

    return (
        <div className={`custom-select ${showOptions ? 'active' : ''}`}>
            <div className={`select-box ${showOptions ? 'active' : ''}`} onClick={() => setShowOptions(!showOptions)}>
               <span className="select-label" style={{ color: textColor }}>
                    {field.value || label}
                </span>
            </div>
            {showOptions && (
                <div className="options-container">
                    {props.options.map((option) => (
                        <label className="option" key={option}>
                            {option}
                            <input
                                type="radio"
                                name={props.name}
                                value={option}
                                checked={field.value === option}
                                onChange={() => handleOptionClick(option)}
                            />
                        </label>
                    ))}
                </div>
            )}
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default CustomSelect;
