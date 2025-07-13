import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import { useRef } from 'react';
import { useCreateLearningMutation } from '../../redux/learning/learningApiSlice.js';
import LearningForm from '../../components/form/page-forms/LearningForm.jsx';

export default function CreateLearningPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const previousPath = useRef(location.state?.from?.pathname ?? '/admin/learning');

    const [createFaq, { isLoading }] = useCreateLearningMutation();

    const handleSubmit = async (values) => {
        try {
            await createFaq({ data: values }).unwrap();
            navigate('/admin/learning');
            acceptHandler('Запис успішно доданий');
        } catch (err) {
            errorHandler(err.data.message);
        }
    };

    return (
        <>
            <PageMeta title="Create learning process" description="Create learning process" />
            <PageBreadcrumb
                breadcrumbs={[
                    { title: 'Home', to: '/admin/dashboard' },
                    { title: 'Learning process', to: '/admin/learning' },
                    { title: 'Create learning process' },
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Learning process">
                    <LearningForm
                        defaultCurrent={{
                            title: '',
                            description: '',
                            published: true,
                        }}
                        handleSubmit={handleSubmit}
                        backLinkPath={previousPath}
                    />
                </ComponentCard>
            </div>
        </>
    );
}
