import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import { useDeleteUserMutation, useUsersQuery } from '../../redux/users/usersApiSlice.js';
import CrudPage from '../../components/shared/CrudPage.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';

export default function userPage() {
  const gridHeaderRow = [
    { name: 'id', label: '#' },
    { name: 'login', label: "Ім'я користувача" },
    { name: 'last_login_at', label: 'Дата останнього входу' },
    { name: 'created_at', label: 'Дата створення' },
    { name: 'role.label', label: 'Роль', badge: true },
  ];

  return (
    <>
      <PageMeta title="User page" description="User page" />
      <PageBreadcrumb
        breadcrumbs={[{ title: 'Home', to: '/admin/dashboard' }, { title: 'Users' }]}
      />
      <div className="space-y-6">
        <ComponentCard title="Users">
          <CrudPage
            buttonTitle="Users"
            createPath="/admin/users/create"
            editPath="/admin/users"
            gridHeaderRow={gridHeaderRow}
            useQuery={useUsersQuery}
            useDeleteMutation={useDeleteUserMutation}
          />
        </ComponentCard>
      </div>
    </>
  );
}
