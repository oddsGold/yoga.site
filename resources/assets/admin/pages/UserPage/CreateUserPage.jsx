import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateUserMutation } from '../../redux/users/usersApiSlice.js';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import React, { useRef, useState } from 'react';
import UserForm from '../../components/form/page-forms/UserForm.jsx';
import { useRolesQuery } from '../../redux/roles/rolesApiSlice.js';
import { useCrudPageLogic } from '../../hooks/useCrudPageLogic.js';
import generatePassword from '../../components/utils/generatePassword.js';
import { CopyIcon, PasswordIcon } from '../../icons/index.js';

export default function CreateUserPage() {
  const navigate = useNavigate();
  const formRef = useRef();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [password, setPassword] = useState('');

  const { data } = useCrudPageLogic({ useQuery: useRolesQuery });

  const location = useLocation();
  const previousPath = useRef(location.state?.from?.pathname ?? '/admin/users');

  const handleGenerate = () => {
    const newPassword = generatePassword(10);
    setPassword(newPassword);
    formRef.current?.setPassword(newPassword);
  };

  const handleCopy = () => {
    if (password) {
      navigator.clipboard
        .writeText(password)
        .then(() => {
          acceptHandler('Пароль скопійовано в буфер обміну!');
        })
        .catch((err) => {
          errorHandler.error('Не вдалося скопіювати:');
        });
    }
  };

  const handleSubmit = async (values) => {
    try {
      await createUser({ data: values }).unwrap();
      navigate('/admin/users');
      acceptHandler('Користувач успішно доданий');
    } catch (err) {
      errorHandler(err.data.message);
    }
  };

  return (
    <>
      <PageMeta title="Create new user" description="Create new user" />
      <PageBreadcrumb
        breadcrumbs={[
          { title: 'Home', to: '/admin/dashboard' },
          { title: 'Users', to: '/admin/users' },
          { title: 'Create new user' },
        ]}
      />
      <div className="space-y-6">
        <ComponentCard title="Create user">
          <button
            onClick={handleGenerate}
            className="inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 "
          >
            <span className="flex items-center">
              <PasswordIcon className="text-lg" />
            </span>
            Generate password
          </button>
          {password && (
            <p
              onClick={handleCopy}
              className="flex w-fit text-base font-medium text-gray-800 dark:text-white/90"
            >
              <span className="pr-[5px]">{password}</span>
              <CopyIcon className="text-xs cursor-pointer" title="Натисніть для копіювання" />
            </p>
          )}

          <UserForm
            ref={formRef}
            defaultCurrent={{
              login: '',
              email: '',
              role: null,
              password: '',
              password_confirmation: '',
              tfa: true,
            }}
            password={false}
            handleSubmit={handleSubmit}
            roles={data}
            backLinkPath={previousPath}
          />
        </ComponentCard>
      </div>
    </>
  );
}
