import React from 'react';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import Label from '../Label.jsx';
import FormikInput from '../input/FormikInput.jsx';
import Editor from '../../generics/Editor.jsx';
import GroupButtons from '../../ui/button/GroupButtons.jsx';

export default function MainForm({
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
                title: Yup.string()
                    .max(255, 'Максимально допустимо 255 символів')
                    .min(3, 'Мінімально 3 символи')
                    .required('Поле необхідне до заповнення'),
                description_1: Yup.string()
                    .min(10, 'Мінімально 10 символів')
                    .required('Поле необхідне до заповнення'),
                description_2: Yup.string()
                    .min(10, 'Мінімально 10 символів')
                    .required('Поле необхідне до заповнення'),
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
                                Title <span className="text-error-500">*</span>{' '}
                            </Label>
                            <Field
                                id="title"
                                placeholder="Enter your title"
                                name="title"
                                autoFocus
                                component={FormikInput}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.title && touched.title)}
                                helperText={touched.title && errors.title}
                            />
                        </div>

                        <div className="pb-3">
                            <Label>
                                Description top<span className="text-error-500">*</span>{' '}
                            </Label>
                            <Field
                                id="description_1"
                                placeholder="Enter a course syllabus"
                                name="description_1"
                                autoFocus
                                component={FormikInput}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.description_1 && touched.description_1)}
                                helperText={touched.description_1 && errors.description_1}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="pb-3">
                            <Label>
                                Description bottom<span className="text-error-500">*</span>{' '}
                            </Label>
                            <Editor name={'description_2'} required={true} />
                        </div>
                    </div>

                    <GroupButtons backLinkPath={backLinkPath.current} isSubmitting={isSubmitting} />
                </Form>
            )}
        </Formik>
    );
}
