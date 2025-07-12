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

export default function FaqForm({
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
          .min(50, 'Мінімально 50 символів')
          .required('Поле необхідне до заповнення'),
        published: Yup.boolean(),
        published_at: Yup.date()
          .nullable()
          .when('published', {
            is: true,
            then: (schema) => schema.nullable(),
          }),
        published_to: Yup.date()
          .nullable()
          .when(['published', 'published_at'], {
            is: (published, published_at) => published && !!published_at,
            then: (schema) =>
              schema.min(
                Yup.ref('published_at'),
                'Дата закінчення публікації не може бути раніше дати початку публікації'
              ),
            otherwise: (schema) => schema.nullable(),
          }),
      })}
      onSubmit={(values) => {
        try {
          const formattedValues = {
            ...values,
            published_at:
              values.published && values.published_at
                ? format(values.published_at, 'yyyy-MM-dd HH:mm:ss')
                : '',
            published_to:
              values.published && values.published_to
                ? format(values.published_to, 'yyyy-MM-dd HH:mm:ss')
                : '',
          };
          handleSubmit(formattedValues);
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
          </div>

          <div className="space-y-6">
            <div className="pb-3">
              <Label>
                Description <span className="text-error-500">*</span>{' '}
              </Label>
              <Editor name={'description'} required={true} />
            </div>
          </div>

          <div className="pb-5 pt-3 flex items-center gap-3">
            <Switch
              label="Опублікувати"
              defaultChecked={Boolean(values.published)}
              onChange={() => setFieldValue('published', !values.published)}
            />
          </div>

          {values.published && (
            <div className="pb-5 pt-3">
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <Field
                  id="published_at"
                  placeholder="Оберіть дату"
                  label="Дата початку публікації"
                  name="published_at"
                  autoFocus
                  component={FormikInputDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.published_at && touched.published_at)}
                  helperText={touched.published_at && errors.published_at}
                />
                <Field
                  id="published_to"
                  placeholder="Оберіть дату"
                  label="Дата завершення публікації"
                  name="published_to"
                  autoFocus
                  component={FormikInputDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.published_to && touched.published_to)}
                  helperText={touched.published_to && errors.published_to}
                />
              </div>
              <p className="text-[12px] text-gray-500 mt-2">
                Якщо дати не вказано — публікація почнеться одразу після збереження*.
              </p>
            </div>
          )}

          <GroupButtons backLinkPath={backLinkPath.current} isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
}
