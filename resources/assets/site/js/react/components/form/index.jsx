import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loading from "../generic/Loading";
import CustomSelect from "./feedback/customSelect";

const FormTemplate = ({ title, apiMethod, buttonClose = null }) => {
    const [result, setResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (values) => {
        setLoading(true);
        apiMethod(values)
            .then((response) => {
                if (response && response.data && response.status === 201) {
                    setResult(true);
                }
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleClose = () => {
        setResult(false);
    };

    return (
        <div className={"feedback " + (result ? "result" : "")}>
            {loading && <Loading />}
            {result ? (
                <div className="feedback-popup">
                    <button className="close-button" onClick={handleClose}>
                        &#10006;
                    </button>
                    <div className="title">Дякуємо за звернення</div>
                    <div className="message">
                        Наші фахівці зв'яжуться з вами найближчим часом
                    </div>
                </div>
            ) : (
                ""
            )}
            <div className="title">{title}</div>
            <Formik
                initialValues={{
                    name: "",
                    phone: "",
                    email: "",
                    edrpou: "",
                    orgName: "",
                    question: "",
                }}
                validateOnMount={true}
                enableReinitialize={true}
                onSubmit={(values, actions) => {
                    handleSubmit(values);
                    actions.setSubmitting(false);
                }}
                validationSchema={Yup.object({
                    name: Yup.string().min(3, 'Ім\'я не може бути менше 3-х символів')
                        .max(200, 'Ім\'я не може бути більше 200 символів')
                        .required('Введіть Ім\'я'),
                    phone: Yup.string().min(7, 'Телефон не може бути менше 7 символів')
                        .max(18, 'Телефон не може бути більше 18 символів')
                        .matches(/[\d]+/miu, 'Недійсний номер телефону')
                        .matches(/^[\d+\- \(\)]{7,}$/miu, 'Недійсний номер телефону')
                        .nullable(),
                    email: Yup.string().min(6, 'Емейл не може бути менше 6 символів')
                        .max(150, 'Емейл не може бути більше 150 символів')
                        .email('Недійсна електронна адреса')
                        .required('Введіть емейл адресу'),
                    edrpou: Yup.string().max(10, 'Едрпоу не може бути більше ніж 10 символів')
                        .min(8, 'Едрпоу не може бути менше ніж 8 символів')
                        .matches(/^([\d]{8,10}|[а-яА-ЯіІєЄ]{2}[\d]{6})$/miu, "Невірне едрпоу"),
                    orgName: Yup.string().max(255, 'Назва не може бути більше ніж 255 символів')
                        .min(8, 'Назва не може бути менше ніж 3 символів'),
                    question: Yup.string().min(3, 'Запитання не може бути менше ніж 3-х символів')
                })}
            >
                {({ touched, errors, isValid, values }) => {
                    return (
                        <Form>
                            {buttonClose && React.cloneElement(buttonClose, { onClick: handleClose })}
                            <div className="row">
                                <div className="offset-0 col-12 col-md-6">
                                    <div
                                        className={`input-wrapper ${
                                            values.name !== "" ? "" : "required"
                                        } ${(touched.name && errors.name) ? "error" : ""} ${
                                            touched.name && !errors.name ? "valid" : ""
                                        }`}
                                    >
                                        <label htmlFor="name">Як до вас звертатися</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            placeholder="Ім'я"
                                            name="name"
                                            id="name"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            className="error form-text"
                                            name="name"
                                        />
                                    </div>
                                    <div
                                        className={`input-wrapper ${
                                            touched.phone && errors.phone ? "error" : ""
                                        } ${
                                            (touched.phone && !errors.phone) || isValid
                                                ? "valid"
                                                : ""
                                        }`}
                                    >
                                        <label htmlFor="phone">Номер телефону</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            placeholder="+380 00 000 00 00"
                                            name="phone"
                                            id="phone"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            className="error form-text"
                                            name="phone"
                                        />
                                    </div>
                                    <div
                                        className={`input-wrapper ${
                                            values.email !== "" ? "" : "required"
                                        } ${(touched.email && errors.email) ? "error" : ""} ${
                                            touched.email && !errors.email ? "valid" : ""
                                        }`}
                                    >
                                        <label htmlFor="email">Email</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            placeholder="mymail@gmail.com "
                                            name="email"
                                            id="email"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            className="error form-text"
                                            name="email"
                                        />
                                    </div>
                                    <div
                                        className={`input-wrapper ${
                                            touched.edrpou && errors.edrpou ? "error" : ""
                                        } ${
                                            touched.edrpou && !errors.edrpou ? "valid" : ""
                                        }`}
                                    >
                                        <label htmlFor="edrpou">Код ЄДРПОУ/ДРФО</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            placeholder="XXXXXXXX"
                                            name="edrpou"
                                            id="edrpou"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            className="error form-text"
                                            name="edrpou"
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div
                                        className={`input-wrapper ${
                                            touched.orgName && errors.orgName ? "error" : ""
                                        } ${
                                            touched.orgName && !errors.orgName ? "valid" : ""
                                        }`}
                                    >
                                        <label htmlFor="orgName">Назва організації</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            placeholder="Введіть назву організації"
                                            name="orgName"
                                            id="orgName"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            className="error form-text"
                                            name="orgName"
                                        />
                                    </div>
                                    <div className="input-wrapper">
                                        <p>Тип рішення</p>
                                        <CustomSelect
                                            label="Оберіть тип рішення"
                                            name="type"
                                            options={[
                                                "COTA CRS",
                                                "COTA API CRS",
                                                "Робота з підзвітними установами",
                                                "Ще не визначився",
                                            ]}
                                        />
                                    </div>
                                    <div className="input-wrapper">
                                        <p>Робота з підзвітними установами</p>
                                        <CustomSelect
                                            label="Оберіть варіант"
                                            name="accountable"
                                            options={["Так", "Ні"]}
                                        />
                                    </div>
                                    <div
                                        className={`input-wrapper ${
                                            touched.question && errors.question ? "error" : ""
                                        } ${
                                            touched.question && !errors.question ? "valid" : ""
                                        }`}
                                    >
                                        <label htmlFor="question">Ваше запитання</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            placeholder="Напишіть коментар"
                                            name="question"
                                            id="question"
                                        />
                                        <ErrorMessage
                                            component="div"
                                            className="error form-text"
                                            name="question"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="feedback-bnt">
                                <button type="submit" className="btn btn-base" disabled={!isValid}>
                                    Відправити
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
            <div className="agreement-personal-data">
                Надсилаючи цю форму, ви даєте{" "}
                <a
                    href="https://sota-buh.com.ua/page/zhoda-na-obrobku-personalnykh-danykh"
                    target="_blank"
                >
                    згоду на зберігання й обробку ваших особистих даних
                </a>
                {" "}компанією ТОВ "Економічні програми" та надаєте згоду на отримання рекламних матеріалів.
            </div>
        </div>
    );
};

export default FormTemplate;
