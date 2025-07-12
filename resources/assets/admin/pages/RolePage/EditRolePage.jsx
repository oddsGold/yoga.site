import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCurrentUserQuery, useUpdateUserMutation } from '../../redux/users/usersApiSlice.js';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import React, { useRef } from 'react';
import UserForm from '../../components/form/page-forms/UserForm.jsx';
import { Loading } from '../../components/loadingBar/Loading.jsx';
import {
  useCurrentRoleQuery,
  useResourcesQuery,
  useRolesQuery,
  useUpdateRoleMutation,
} from '../../redux/roles/rolesApiSlice.js';
import { useCrudPageLogic } from '../../hooks/useCrudPageLogic.js';
import RoleForm from '../../components/form/page-forms/RoleForm.jsx';

export default function EditRolePage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const previousPath = useRef(location.state?.from?.pathname ?? '/admin/roles');

  const { data: currentRole, error, isLoading: isCurrentRoleLoading } = useCurrentRoleQuery(id);
  const {
    data: resources,
    error: isResourcesError,
    isLoading: isResourcesLoading,
  } = useResourcesQuery();

  const [updateRole, { isLoading: isUpdateRoleLoading }] = useUpdateRoleMutation();

  const isLoading = isCurrentRoleLoading || isResourcesLoading;

  const isEmptyData =
    !currentRole ||
    (typeof currentRole === 'object' && Object.keys(currentRole).length === 0) ||
    !resources ||
    (Array.isArray(resources) && resources.length === 0);

  const handleSubmit = async (values) => {
    try {
      await updateRole({ data: values }).unwrap();
      navigate('/admin/roles');
      acceptHandler('Запис успішно відредаговано');
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
              { title: 'Roles', to: '/admin/roles' },
              { title: 'Edit role page' },
            ]}
          />

          {isEmptyData ? (
            <div className="text-lg font-medium text-gray-800 dark:text-white/90">
              Data not found
            </div>
          ) : (
            <div className="space-y-6">
              <ComponentCard title="Edit role">
                <RoleForm
                  current={currentRole}
                  resources={resources}
                  handleSubmit={handleSubmit}
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
