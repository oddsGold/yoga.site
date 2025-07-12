import React from 'react';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import Label from '../Label.jsx';
import FormikInput from '../input/FormikInput.jsx';
import Switch from '../switch/Switch.jsx';
import Editor from '../../generics/Editor.jsx';
import FormikInputDate from '../input/FormikInputDate.jsx';
import { format } from 'date-fns';
import GroupButtons from '../../ui/button/GroupButtons.jsx';

export default function ProgramForm({
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
        description: Yup.string()
          .min(20, 'Мінімально 50 символів')
          .required('Поле необхідне до заповнення')
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
                      Title <span className="text-error-500">*</span>{' '}
                  </Label>
                  <Field
                      id="description"
                      placeholder="Enter a course syllabus"
                      name="description"
                      autoFocus
                      component={FormikInput}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.description && touched.description)}
                      helperText={touched.description && errors.description}
                  />
              </div>
          </div>

          <GroupButtons backLinkPath={backLinkPath.current} isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
}
