import { useEffect, useRef } from 'react';
import { EyeCloseIcon, EyeIcon } from '../../icons';
import Label from '../form/Label.jsx';
import Button from '../ui/button/Button.jsx';
import { useLazyForgotTFAQuery, useLoginTFAMutation } from '../../redux/auth/authApiSlice.js';
import { errorHandler } from '../utils/toastHandler.js';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormikInput from '../form/input/FormikInput.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { logOutFromTFA } from '../../redux/auth/slice.js';
import { selectTFAQrCode } from '../../redux/auth/selectors.js';

export default function SignInFormTfa() {
  const [loginTFA, { isLoading: isLoginTFALoading }] = useLoginTFAMutation();
  const [triggerForgotTFA, { isLoading: isForgotTFAFetching }] = useLazyForgotTFAQuery();
  const userRef = useRef(null);
  const errRef = useRef(null);
  const dispatch = useDispatch();

  const qrCode = useSelector(selectTFAQrCode);

  const handleLogout = async () => {
    dispatch(logOutFromTFA());
  };

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  const handleLoginTFA = async (values, { setSubmitting }) => {
    try {
      await loginTFA(values).unwrap();
      setSubmitting(false);
    } catch (err) {
      errorHandler(err.data.message);
      if (errRef.current) {
        errRef.current.focus();
      }
      setSubmitting(false);
    }
  };

  const handleForgotTFA = async () => {
    try {
      await triggerForgotTFA();
    } catch (error) {
      console.error('Error in TFA forgot:', error);
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
              Enter your TFA code to sign in!
            </p>
          </div>

          {qrCode && (
            <div>
              <div className="mb-5 sm:mb-8">
                <img src={qrCode} className="qr mx-auto" />
              </div>
            </div>
          )}

          <div>
            <Formik
              initialValues={{ code: '' }}
              validationSchema={Yup.object({
                code: Yup.string().required('TFA code is required'),
              })}
              onSubmit={handleLoginTFA}
            >
              {({ isSubmitting, handleChange, handleBlur, values, errors, touched }) => (
                <Form autoComplete="off">
                  <div className="space-y-6">
                    <div>
                      <Label>
                        TFA code <span className="text-error-500">*</span>{' '}
                      </Label>
                      <Field
                        id="tfa"
                        placeholder="Enter TFA code"
                        name="code"
                        autoFocus
                        component={FormikInput}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.code}
                        error={Boolean(errors.code && touched.code)}
                        helperText={touched.code && errors.code}
                      />
                    </div>
                    <div>
                      <Button type="submit" disabled={isSubmitting} className="w-full" size="sm">
                        Send
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="flex gap-2 mt-4">
              <Button
                type="button"
                onClick={handleLogout}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                size="sm"
              >
                Back
              </Button>
              <Button type="submit" onClick={handleForgotTFA} className="flex-1" size="sm">
                {isForgotTFAFetching ? 'Sending...' : 'Send to email'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
