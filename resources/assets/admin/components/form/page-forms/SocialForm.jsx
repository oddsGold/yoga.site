import React from 'react';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import Label from '../Label.jsx';
import FormikInput from '../input/FormikInput.jsx';
import Button from '../../ui/button/Button.jsx';
import Switch from '../switch/Switch.jsx';
import { Link } from 'react-router-dom';
import Editor from '../../generics/Editor.jsx';
import FormikInputDate from '../input/FormikInputDate.jsx';
import { format } from 'date-fns';
import GroupButtons from '../../ui/button/GroupButtons.jsx';

export default function SocialForm({
                                       current = null,
                                       defaultCurrent,
                                       handleSubmit,
                                       enableReinitialize = true,
                                       resources = [],
                                       backLinkPath,
                                   }) {
    return (
        <Formik
            initialValues={current ? current : defaultCurrent}
            enableReinitialize={enableReinitialize}
            validationSchema={Yup.object().shape({
                facebook: Yup.string()
                    .max(500, 'Максимально допустимо 500 символів'),
                instagram: Yup.string()
                    .max(500, 'Максимально допустимо 500 символів'),
                tik_tok: Yup.string()
                    .max(500, 'Максимально допустимо 500 символів'),
                you_tube: Yup.string()
                    .max(500, 'Максимально допустимо 500 символів'),
                telegram: Yup.string()
                    .max(500, 'Максимально допустимо 500 символів'),
            })}
            onSubmit={(values) => {
                try {
                    handleSubmit(values);
                } catch (error) {
                    console.error(error);
                }
            }}
        >
            {({ isSubmitting, handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
                <Form autoComplete="off">
                    <div className="space-y-6">
                        <div className="pb-3">
                            <Label>
                                Facebook
                            </Label>
                            <Field
                                id="facebook"
                                placeholder="Enter your social link for facebook"
                                name="facebook"
                                autoFocus
                                component={FormikInput}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.facebook && touched.facebook)}
                                helperText={touched.facebook && errors.facebook}
                            />
                        </div>
                        <div className="pb-3">
                            <Label>
                                Instagram
                            </Label>
                            <Field
                                id="instagram"
                                placeholder="Enter your social link for instagram"
                                name="instagram"
                                autoFocus
                                component={FormikInput}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.instagram && touched.instagram)}
                                helperText={touched.instagram && errors.instagram}
                            />
                        </div>
                        <div className="pb-3">
                            <Label>
                                Tik Tok
                            </Label>
                            <Field
                                id="tik_tok"
                                placeholder="Enter your social link for tik tok"
                                name="tik_tok"
                                autoFocus
                                component={FormikInput}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.tik_tok && touched.tik_tok)}
                                helperText={touched.tik_tok && errors.tik_tok}
                            />
                        </div>
                        <div className="pb-3">
                            <Label>
                                YouTube
                            </Label>
                            <Field
                                id="you_tube"
                                placeholder="Enter your social link for youtube"
                                name="you_tube"
                                autoFocus
                                component={FormikInput}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.you_tube && touched.you_tube)}
                                helperText={touched.you_tube && errors.you_tube}
                            />
                        </div>
                        <div className="pb-3">
                            <Label>
                                Telegram
                            </Label>
                            <Field
                                id="telegram"
                                placeholder="Enter your social link for telegram"
                                name="telegram"
                                autoFocus
                                component={FormikInput}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.telegram && touched.telegram)}
                                helperText={touched.telegram && errors.telegram}
                            />
                        </div>
                    </div>

                    <div className="mt-1 mb-4 text-sm text-red-300">
                        Якщо додавати соціальну мережу не потрібно на сайт, просто залиште поле пустим *
                    </div>

                    <GroupButtons backLinkPath={backLinkPath.current} isSubmitting={isSubmitting} />
                </Form>
            )}
        </Formik>
    );
}
