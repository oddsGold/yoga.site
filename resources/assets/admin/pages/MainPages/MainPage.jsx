import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import CrudPage from '../../components/shared/CrudPage.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useDeleteMainMutation, useMainQuery } from '../../redux/main/mainApiSlice.js';

export default function MainPage() {
  const gridHeaderRow = [
    { name: 'id', label: '#', sortable: true },
    { name: 'title', label: 'Назва' },
    { name: 'description_1', label: 'Опис вгорі' },
    { name: 'description_2', label: 'Опис знизу' },
  ];

  return (
    <>
      <PageMeta title="Main section" description="Main section" />
      <PageBreadcrumb breadcrumbs={[{ title: 'Home', to: '/admin/dashboard' }, { title: 'Main section' }]} />
      <div className="space-y-6">
        <ComponentCard title="Main section">
          <CrudPage
            buttonTitle="Main section"
            createPath="/admin/main/create"
            editPath="/admin/main"
            gridHeaderRow={gridHeaderRow}
            useQuery={useMainQuery}
            useDeleteMutation={useDeleteMainMutation}
            dnd={false}
          />
        </ComponentCard>
      </div>
    </>
  );
}
