import React, { useImperativeHandle, useRef, useState } from 'react';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import Label from '../Label.jsx';
import FormikInput from '../input/FormikInput.jsx';
import FormikSelect from '../input/FormikSelect.jsx';
import Switch from '../switch/Switch.jsx';
import { EyeCloseIcon, EyeIcon } from '../../../icons/index.js';
import GroupButtons from '../../ui/button/GroupButtons.jsx';

export default function UserForm({
  current = null,
  defaultCurrent,
  handleSubmit,
  enableReinitialize = true,
  roles = [],
  backLinkPath,
  password = false,
  ref,
}) {
  const formikRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  useImperativeHandle(ref, () => ({
    setPassword: (newPassword) => {
      if (formikRef.current) {
        formikRef.current.setFieldValue('password', newPassword);
        formikRef.current.setFieldValue('password_confirmation', newPassword);
      }
    },
  }));

  return (
    <Formik
      innerRef={formikRef}
      initialValues={current ? current : defaultCurrent}
      enableReinitialize={enableReinitialize}
      validationSchema={Yup.object().shape({
        login: Yup.string().required("Поле login обов'язкове до заповнення"),
        email: Yup.string()
          .email('Недійсна електронна адреса')
          .required("Поле email обов'язкове до заповнення"),
        role: Yup.mixed().required("Поле role обов'язкове до заповнення"),
        password: password
          ? Yup.string()
              .max(255, 'Максимально допустимо 180 символів')
              .min(8, 'Мінімально 8 символів')
              .required("Поле обов'язкове до заповнення")
          : Yup.string()
              .max(255, 'Максимально допустимо 180 символів')
              .min(8, 'Мінімально 8 символів'),
        password_confirmation: password
          ? Yup.string()
              .oneOf([Yup.ref('password')], 'Паролі не збігаються')
              .required("Поле обов'язкове до заповнення")
          : Yup.string().oneOf([Yup.ref('password')], 'Паролі не збігаються'),
      })}
      onSubmit={(values) => {
        const valuesToSend = {
          ...values,
          tfa: 0,
        };
        handleSubmit(valuesToSend);
      }}
    >
      {({ isSubmitting, handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
        <Form autoComplete="off">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="space-y-6">
              <div className="pb-3">
                <Label>
                  Login <span className="text-error-500">*</span>{' '}
                </Label>
                <Field
                  id="login"
                  placeholder="Enter your login"
                  name="login"
                  autoFocus
                  component={FormikInput}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autocomplete="off"
                  error={Boolean(errors.login && touched.login)}
                  helperText={touched.login && errors.login}
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="pb-3">
                <Label>
                  Email <span className="text-error-500">*</span>{' '}
                </Label>
                <Field
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  autoFocus
                  component={FormikInput}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.email && touched.email)}
                  helperText={touched.email && errors.email}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="space-y-6">
              <div className="pb-3">
                <Label>Password</Label>
                <div className="relative">
                  <Field
                    name="password"
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    component={FormikInput}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autocomplete="off"
                    error={Boolean(errors.password && touched.password)}
                    helperText={touched.password && errors.password}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-[22px]"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="pb-3">
                <Label>Confirm password</Label>
                <div className="relative">
                  <Field
                    name="password_confirmation"
                    placeholder="Confirm password"
                    type={showPassword ? 'text' : 'password'}
                    id="password_confirmation"
                    component={FormikInput}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.password_confirmation && touched.password_confirmation)}
                    helperText={touched.password_confirmation && errors.password_confirmation}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-[22px]"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="pb-3">
              <Label>
                Role <span className="text-error-500">*</span>{' '}
              </Label>
              <Field
                id="role"
                placeholder="Select role"
                name="role"
                autoFocus
                component={FormikSelect}
                options={roles.map((role) => ({
                  label: role.name,
                  value: role.id,
                }))}
                error={Boolean(errors.role && touched.role)}
                helperText={touched.role && errors.role}
              />
            </div>
          </div>

          <GroupButtons backLinkPath={backLinkPath.current} isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
}
