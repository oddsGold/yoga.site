import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import CrudPage from '../../components/shared/CrudPage.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useDeleteRoleMutation, useRolesQuery } from '../../redux/roles/rolesApiSlice.js';

export default function RolePage() {
  const gridHeaderRow = [
    { name: 'id', label: '#' },
    { name: 'label', label: 'Роль', badge: true },
    { name: 'created_at', label: 'Дата створення' },
    { name: 'updated_at', label: 'Дата модифікації' },
  ];

  return (
    <>
      <PageMeta title="User page" description="User page" />
      <PageBreadcrumb
        breadcrumbs={[{ title: 'Home', to: '/admin/dashboard' }, { title: 'Roles' }]}
      />
      <div className="space-y-6">
        <ComponentCard title="Roles">
          <CrudPage
            buttonTitle="Role"
            createPath="/admin/roles/create"
            editPath="/admin/roles"
            gridHeaderRow={gridHeaderRow}
            useQuery={useRolesQuery}
            useDeleteMutation={useDeleteRoleMutation}
          />
        </ComponentCard>
      </div>
    </>
  );
}
