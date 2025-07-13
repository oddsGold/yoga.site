import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import CrudPage from '../../components/shared/CrudPage.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useDeleteLearningMutation, useLearningQuery } from '../../redux/learning/learningApiSlice.js';

export default function LearningPage() {
    const gridHeaderRow = [
        { name: 'id', label: '#', sortable: true },
        { name: 'title', label: 'Назва' },
        { name: 'description', label: 'Опис' },
        { name: 'created_at', label: 'Дата створення' },
        { name: 'updated_at', label: 'Дата модифікації' },
    ];

    return (
        <>
            <PageMeta title="Learning process" description="Learning process" />
            <PageBreadcrumb breadcrumbs={[{ title: 'Home', to: '/admin/learning' }, { title: 'Learning process' }]} />
            <div className="space-y-6">
                <ComponentCard title="Learning process">
                    <CrudPage
                        buttonTitle="Learning process"
                        createPath="/admin/learning/create"
                        editPath="/admin/learning"
                        gridHeaderRow={gridHeaderRow}
                        useQuery={useLearningQuery}
                        useDeleteMutation={useDeleteLearningMutation}
                        dnd={false}
                    />
                </ComponentCard>
            </div>
        </>
    );
}
