import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import { useRef } from 'react';
import { useCreateWorthMutation } from '../../redux/worth/worthApiSlice.js';
import ProgramForm from '../../components/form/page-forms/ProgramForm.jsx';

export default function CreateWorthPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const previousPath = useRef(location.state?.from?.pathname ?? '/admin/worth');

    const [createWorth, { isLoading }] = useCreateWorthMutation();

    const handleSubmit = async (values) => {
        try {
            await createWorth({ data: values }).unwrap();
            navigate('/admin/worth');
            acceptHandler('Причина успішно додана');
        } catch (err) {
            errorHandler(err.data.message);
        }
    };

    return (
        <>
            <PageMeta title="Create new reason" description="Create reason" />
            <PageBreadcrumb
                breadcrumbs={[
                    { title: 'Home', to: '/admin/dashboard' },
                    { title: 'Reason', to: '/admin/worth' },
                    { title: 'Create reason' },
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Create reason">
                    <ProgramForm
                        defaultCurrent={{
                            description: '',
                            published: false,
                            published_at: '',
                            published_to: '',
                        }}
                        handleSubmit={handleSubmit}
                        backLinkPath={previousPath}
                    />
                </ComponentCard>
            </div>
        </>
    );
}
