import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import CrudPage from '../../components/shared/CrudPage.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useDeleteProgramMutation, useProgramQuery } from '../../redux/program/programApiSlice.js';

export default function ProgramPage() {
  const gridHeaderRow = [
    { name: 'id', label: '#', sortable: true },
    { name: 'title', label: 'Назва' },
    { name: 'description', label: 'Опис' },
    { name: 'created_at', label: 'Дата створення' },
    { name: 'updated_at', label: 'Дата модифікації' },
  ];

  return (
    <>
      <PageMeta title="Program page" description="Program page" />
      <PageBreadcrumb breadcrumbs={[{ title: 'Home', to: '/admin/dashboard' }, { title: 'Program' }]} />
      <div className="space-y-6">
        <ComponentCard title="Program">
          <CrudPage
            buttonTitle="Program"
            createPath="/admin/program/create"
            editPath="/admin/program"
            gridHeaderRow={gridHeaderRow}
            useQuery={useProgramQuery}
            useDeleteMutation={useDeleteProgramMutation}
            dnd={false}
          />
        </ComponentCard>
      </div>
    </>
  );
}
