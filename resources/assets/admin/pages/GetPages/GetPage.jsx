import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import CrudPage from '../../components/shared/CrudPage.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useDeleteGetMutation, useGetQuery } from '../../redux/get/getApiSlice.js';

export default function GetPage() {
  const gridHeaderRow = [
    { name: 'id', label: '#', sortable: true },
    { name: 'description', label: 'Опис' },
    { name: 'created_at', label: 'Дата створення' },
    { name: 'updated_at', label: 'Дата модифікації' },
  ];

  return (
    <>
      <PageMeta title="What will you get?" description="What will you get?" />
      <PageBreadcrumb breadcrumbs={[{ title: 'Home', to: '/admin/get' }, { title: 'get' }]} />
      <div className="space-y-6">
        <ComponentCard title="What will you get?">
          <CrudPage
            buttonTitle="Benefit"
            createPath="/admin/get/create"
            editPath="/admin/get"
            gridHeaderRow={gridHeaderRow}
            useQuery={useGetQuery}
            useDeleteMutation={useDeleteGetMutation}
            dnd={false}
          />
        </ComponentCard>
      </div>
    </>
  );
}
