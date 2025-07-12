import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import CrudPage from '../../components/shared/CrudPage.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useDeleteFormMutation, useFormInfoQuery } from '../../redux/form/formApiSlice.js';

export default function FormPage() {
    const gridHeaderRow = [
        { name: 'name', label: "I'мя", sortable: true },
        { name: 'nickname', label: 'Нік' },
        { name: 'phone', label: 'Телефон' },
        { name: 'email', label: 'Email' },
        { name: 'created_at', label: 'Дата створення' }
    ];

    return (
        <>
            <PageMeta title="Form page" description="Form page" />
            <PageBreadcrumb breadcrumbs={[{ title: 'Home', to: '/admin/dashboard' }, { title: 'Form' }]} />
            <div className="space-y-6">
                <ComponentCard title="Form">
                    <CrudPage
                        buttonTitle="form from"
                        gridHeaderRow={gridHeaderRow}
                        useQuery={useFormInfoQuery}
                        useDeleteMutation={useDeleteFormMutation}
                        dnd={false}
                    />
                </ComponentCard>
            </div>
        </>
    );
}
