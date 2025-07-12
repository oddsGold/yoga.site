import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import CrudPage from '../../components/shared/CrudPage.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useDeleteFaqMutation, useFaqQuery } from '../../redux/faq/faqApiSlice.js';

export default function FaqPage() {
  const gridHeaderRow = [
    { name: 'id', label: '#', sortable: true },
    { name: 'title', label: 'Назва', sortable: true },
    { name: 'user', label: 'Автор' },
    { name: 'created_at', label: 'Дата створення' },
    { name: 'updated_at', label: 'Дата модифікації' },
  ];

  return (
    <>
      <PageMeta title="FAQ page" description="FAQ page" />
      <PageBreadcrumb breadcrumbs={[{ title: 'Home', to: '/admin/dashboard' }, { title: 'FAQ' }]} />
      <div className="space-y-6">
        <ComponentCard title="FAQ">
          <CrudPage
            buttonTitle="FAQ"
            createPath="/admin/faqs/create"
            editPath="/admin/faqs"
            gridHeaderRow={gridHeaderRow}
            useQuery={useFaqQuery}
            useDeleteMutation={useDeleteFaqMutation}
            dnd={true}
          />
        </ComponentCard>
      </div>
    </>
  );
}
