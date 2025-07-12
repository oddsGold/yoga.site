import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import { useRef } from 'react';
import { useCreateRoleMutation, useResourcesQuery } from '../../redux/roles/rolesApiSlice.js';
import RoleForm from '../../components/form/page-forms/RoleForm.jsx';

export default function CreateRolePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = useRef(location.state?.from?.pathname ?? '/admin/roles');

  const {
    data: resources,
    error: isResourcesError,
    isLoading: isResourcesLoading,
  } = useResourcesQuery();
  const [createRole, { isLoading }] = useCreateRoleMutation();

  const handleSubmit = async (values) => {
    try {
      await createRole({ data: values }).unwrap();
      navigate('/admin/roles');
      acceptHandler('Роль успішно додано');
    } catch (err) {
      errorHandler(err.data.message);
    }
  };

  return (
    <>
      <PageMeta title="Create new role" description="Create new role" />
      <PageBreadcrumb
        breadcrumbs={[
          { title: 'Home', to: '/admin/dashboard' },
          { title: 'Roles', to: '/admin/roles' },
          { title: 'Create new role' },
        ]}
      />
      <div className="space-y-6">
        <ComponentCard title="Create user">
          <RoleForm
            defaultCurrent={{
              label: '',
              resources: [],
            }}
            handleSubmit={handleSubmit}
            resources={resources}
            backLinkPath={previousPath}
          />
        </ComponentCard>
      </div>
    </>
  );
}
