import React from 'react';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import Label from '../Label.jsx';
import FormikInput from '../input/FormikInput.jsx';
import FormikMultiSelect from '../input/FormikMultiSelect.jsx';
import GroupButtons from '../../ui/button/GroupButtons.jsx';
import FormikMultiSelectSearch from '../input/FormikMultiSelectSearch.jsx';

export default function RoleForm({
  current = null,
  defaultCurrent,
  handleSubmit,
  enableReinitialize = true,
  resources = [],
  // tags = [],
  backLinkPath,
  password = false,
}) {

  return (
    <Formik
      initialValues={current ? current : defaultCurrent}
      enableReinitialize={enableReinitialize}
      validationSchema={Yup.object().shape({
        label: Yup.string().min(3).max(255).required("Поле label обов'язкове до заповнення"),
        resources: Yup.array()
          .of(Yup.mixed())
          .min(1, 'Виберіть ресурс')
          .required("Поле resources обов'язкове до заповнення"),
      })}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ isSubmitting, handleChange, handleBlur, values, errors, touched, setFieldValue }) => {
        return (
          <Form autoComplete="off">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-6">
                <div className="pb-3">
                  <Label>
                    Label <span className="text-error-500">*</span>{' '}
                  </Label>
                  <Field
                    id="label"
                    placeholder="Enter your label"
                    name="label"
                    autoFocus
                    component={FormikInput}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.label && touched.label)}
                    helperText={touched.label && errors.label}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="pb-3">
                  <Label>
                    Resources <span className="text-error-500">*</span>{' '}
                  </Label>
                  <Field
                    id="resources"
                    placeholder="Select resources"
                    name="resources"
                    autoFocus
                    component={FormikMultiSelect}
                    options={resources.map((resource) => ({
                      label: resource.label,
                      value: resource.id,
                    }))}
                    error={Boolean(errors.resources && touched.resources)}
                    helperText={touched.resources && errors.resources}
                  />
                </div>
              </div>
            </div>

            <GroupButtons backLinkPath={backLinkPath.current} isSubmitting={isSubmitting} />
          </Form>
        );
      }}
    </Formik>
  );
}
