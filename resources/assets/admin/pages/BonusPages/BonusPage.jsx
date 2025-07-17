import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import CrudPage from '../../components/shared/CrudPage.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useDeleteBonusMutation, useBonusQuery } from '../../redux/bonus/bonusApiSlice.js';

export default function BonusPage() {
  const gridHeaderRow = [
    { name: 'id', label: '#', sortable: true },
    { name: 'title', label: 'Назва' },
    { name: 'description', label: 'Опис' },
    { name: 'created_at', label: 'Дата створення' },
    { name: 'updated_at', label: 'Дата модифікації' },
  ];

  return (
    <>
      <PageMeta title="Bonus page" description="Bonus page" />
      <PageBreadcrumb breadcrumbs={[{ title: 'Home', to: '/admin/dashboard' }, { title: 'Bonus' }]} />
      <div className="space-y-6">
        <ComponentCard title="Bonus">
          <CrudPage
            buttonTitle="Bonus"
            createPath="/admin/bonus/create"
            editPath="/admin/bonus"
            gridHeaderRow={gridHeaderRow}
            useQuery={useBonusQuery}
            useDeleteMutation={useDeleteBonusMutation}
            dnd={false}
          />
        </ComponentCard>
      </div>
    </>
  );
}
