import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import CrudPage from '../../components/shared/CrudPage.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useDeleteWorthMutation, useWorthQuery } from '../../redux/worth/worthApiSlice.js';

export default function WorthPage() {
  const gridHeaderRow = [
    { name: 'id', label: '#', sortable: true },
    { name: 'description', label: 'Опис' },
    { name: 'created_at', label: 'Дата створення' },
    { name: 'updated_at', label: 'Дата модифікації' },
  ];

  return (
    <>
      <PageMeta title="For whom?" description="For whom?" />
      <PageBreadcrumb breadcrumbs={[{ title: 'Home', to: '/admin/worth' }, { title: 'Reason' }]} />
      <div className="space-y-6">
        <ComponentCard title="For whom?">
          <CrudPage
            buttonTitle="Reason"
            createPath="/admin/worth/create"
            editPath="/admin/worth"
            gridHeaderRow={gridHeaderRow}
            useQuery={useWorthQuery}
            useDeleteMutation={useDeleteWorthMutation}
            dnd={false}
          />
        </ComponentCard>
      </div>
    </>
  );
}
