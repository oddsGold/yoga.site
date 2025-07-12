import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCurrentUserQuery, useUpdateUserMutation } from '../../redux/users/usersApiSlice.js';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import React, { useRef } from 'react';
import UserForm from '../../components/form/page-forms/UserForm.jsx';
import { Loading } from '../../components/loadingBar/Loading.jsx';
import { useRolesQuery } from '../../redux/roles/rolesApiSlice.js';
import { useCrudPageLogic } from '../../hooks/useCrudPageLogic.js';

export default function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = useRef(location.state?.from?.pathname ?? '/admin/users');

  const { data: current, error, isLoading: isCurrentUserLoading } = useCurrentUserQuery(id);
  const { isLoading: isRolesLoading, data } = useCrudPageLogic({ useQuery: useRolesQuery });
  const [updateUser, { isLoading: isUpdateUserLoading }] = useUpdateUserMutation();

  const isLoading = isCurrentUserLoading || isRolesLoading;

  const isEmptyData =
    !current ||
    (typeof current === 'object' && Object.keys(current).length === 0) ||
    !data ||
    (Array.isArray(data) && data.length === 0);

  const handleSubmit = async (values) => {
    try {
      const updatedValues = {
        ...values,
        role: parseInt(values.role),
      };
      await updateUser({ data: updatedValues }).unwrap();
      acceptHandler('Запис успішно відредаговано');
      navigate('/admin/users');
    } catch (err) {
      errorHandler(err.data.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-3xl">
          <Loading />
        </div>
      ) : (
        <>
          <PageMeta title="Edit user" description="Edit user" />
          <PageBreadcrumb
            breadcrumbs={[
              { title: 'Home', to: '/admin/dashboard' },
              { title: 'Users', to: '/admin/users' },
              { title: 'Edit user page' },
            ]}
          />

          {isEmptyData ? (
            <div className="text-lg font-medium text-gray-800 dark:text-white/90">
              Data not found
            </div>
          ) : (
            <div className="space-y-6">
              <ComponentCard title="Edit user">
                <UserForm
                  current={
                    current
                      ? {
                          ...current,
                          password: '',
                          password_confirmation: '',
                          role: current.role.id,
                        }
                      : null
                  }
                  handleSubmit={handleSubmit}
                  roles={data}
                  backLinkPath={previousPath}
                />
              </ComponentCard>
            </div>
          )}
        </>
      )}
    </>
  );
}
