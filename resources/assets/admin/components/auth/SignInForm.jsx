import { useEffect, useRef, useState } from 'react';
import { EyeCloseIcon, EyeIcon } from '../../icons';
import Label from '../form/Label.jsx';
import Button from '../ui/button/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/auth/authApiSlice.js';
import { errorHandler } from '../utils/toastHandler.js';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormikInput from '../form/input/FormikInput.jsx';

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const userRef = useRef(null);
  const errRef = useRef(null);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values).unwrap();
      setSubmitting(false);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      const msg = err?.data?.message ?? '';

      errorHandler(err);
      setErrMsg(msg);
      if (errRef.current) {
        errRef.current.focus();
      }
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your login and password to sign in!
            </p>
          </div>
          <div>
            <Formik
              initialValues={{ login: '', password: '' }}
              validationSchema={Yup.object({
                login: Yup.string()
                  .min(3, 'Login must be at least 3 characters')
                  .max(255, 'Login must be at most 255 characters')
                  .required('Name is required'),
                password: Yup.string()
                  .min(3, 'Password must be at least 3 characters')
                  .max(255, 'Password must be at most 255 characters')
                  .required('Password is required'),
              })}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, handleChange, handleBlur, values, errors, touched }) => (
                <Form autoComplete="off">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="login">
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
                        value={values.login}
                        error={Boolean(errors.login && touched.login)}
                        helperText={touched.login && errors.login}
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">
                        Password <span className="text-error-500">*</span>{' '}
                      </Label>
                      <div className="relative">
                        <Field
                          name="password"
                          placeholder="Password"
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          component={FormikInput}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          error={Boolean(errors.password && touched.password)}
                          helperText={touched.password && errors.password}
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          data-testid="toggle-password"
                          className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                        >
                          {showPassword ? (
                            <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                          ) : (
                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                          )}
                        </span>
                      </div>
                    </div>
                    <div>
                      <Button type="submit" disabled={isSubmitting} className="w-full" size="sm">
                        Sign in
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
