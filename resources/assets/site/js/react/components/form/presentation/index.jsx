import React, { Fragment, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import API from "../../../utils/api";
import PaymentButton from './PaymentButton.jsx';

const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    const classes = [
        'input-wrapper',
        !field.value              ? 'required' : '',
        meta.touched && meta.error ? 'error'    : '',
        meta.touched && !meta.error ? 'valid'   : ''
    ].filter(Boolean).join(' ');

    return (
        <div className={classes}>
            <label htmlFor={props.id || props.name} className="form-label">
                {label}
            </label>
            <input className="form-control" {...field} {...props} />
            {meta.touched && meta.error
                ? <div className="error form-text">{meta.error}</div>
                : null}
        </div>
    );
};

const Presentation = () => {
    const [result, setResult]   = useState(false);
    const [loading, setLoading] = useState(false);
    const [fileName]            = useState('/api/presentation/download/vHMn00v6ouzgZXiHqgLDArz5DdfHdfUG8659jbwU');
    const downloadRef           = useRef(null);

    useEffect(() => {
        if (result) {
            const msgRow = document
                .querySelector('#get-presentation .message')
                ?.closest('.row');
            if (msgRow) {
                msgRow.style.display = 'none';
            }

            const modalBody = document.querySelector('#get-presentation .modal-body');
            if (modalBody) {
                modalBody.classList.add('modal-body--padded');
            }
        }
    }, [result]);

    const handleSubmit = (values) => {
        setLoading(true);
        API.createFormPresentation(values)
            .then(response => {
                if (response?.data && response.status === 201) {
                    setResult(true);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    const handleClose = () => {
        const modalBody = document.querySelector('#get-presentation .modal-body');
        if (modalBody) {
            modalBody.classList.remove('modal-body--padded');
        }
        setTimeout(() => {
            setResult(false);
        }, 2000)
    }

    return (
        <>
            {!result ? (
                <>
                    <Formik
                        initialValues={{
                            name: '',
                            nickname: '',
                            phone: '',
                            email: '',
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .min(3, "Ім'я не може бути менше 3-х символів")
                                .max(200, "Ім'я не може бути більше 200 символів")
                                .required("Це поле має бути заповнене"),
                            nickname: Yup.string()
                                .min(2, "Нік не може бути менше 2-х символів")
                                .max(200, "Нік не може бути більше 200 символів"),
                            phone: Yup.string()
                                .min(7, "Телефон не може бути менше 7 символів")
                                .max(18, "Телефон не може бути більше 18 символів")
                                .matches(/^[\d+\- \(\)]+$/, "Недійсний номер телефону")
                                .required("Це поле має бути заповнене"),
                            email: Yup.string()
                                .min(6, "Емейл не може бути менше 6 символів")
                                .max(150, "Емейл не може бути більше 150 символів")
                                .email("Недійсна електронна адреса")
                                .required("Це поле має бути заповнене"),
                        })}
                        onSubmit={(values, actions) => {
                            handleSubmit(values);
                            actions.setSubmitting(false);
                        }}
                    >
                        {({ isValid, dirty, values, validateForm, setFieldTouched  }) => (
                            <Form>
                                <TextInput
                                    label="Ім’я"
                                    name="name"
                                    type="text"
                                    placeholder="Введіть ім’я"
                                />

                                <TextInput
                                    label="Нік в телеграмі"
                                    name="nickname"
                                    type="text"
                                    placeholder="Введіть нік"
                                />

                                <TextInput
                                    label="Номер телефону"
                                    name="phone"
                                    type="text"
                                    placeholder="+1 (555) 000-0000"
                                />

                                <TextInput
                                    label="Електронна пошта"
                                    name="email"
                                    type="email"
                                    placeholder="Введіть електронну пошту"
                                />

                                <div className="row">
                                    <div className="col text-center">
                                        <a href={fileName} ref={downloadRef} className="downloadPresentation" />
                                        <button
                                            type="submit"
                                            className={`btn btn-base btn-default orange ${isValid && dirty ? 'ready' : ''}`}
                                            disabled={!(isValid && dirty) || loading}
                                        >
                                            {loading ? 'Відправляємо...' : 'Відправити заявку'}
                                        </button>
                                    </div>
                                </div>

                                <PaymentButton
                                    isValid={isValid}
                                    dirty={dirty}
                                    isLoading={loading}
                                    formData={values}
                                    validateForm={validateForm}
                                    setFieldTouched={setFieldTouched}
                                />
                            </Form>
                        )}
                    </Formik>
                </>
            ) : (
                <div className="presentation-form">
                    <div className="success-msg">
                        <div className="description">
                            <p>
                                Дякуємо! Ваша заявка відправлена!
                            </p>
                            <p>
                                Наш менеджер зв’яжеться з вами протягом 24 годин.
                            </p>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                <button className="btn btn-base" onClick={handleClose} data-bs-dismiss="modal" aria-label="Close">
                                    Добре
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const rootElementPresentation = document.getElementById('presentation-root');
if (rootElementPresentation) {
    const root = ReactDOM.createRoot(rootElementPresentation);
    root.render(<Presentation />);
}
