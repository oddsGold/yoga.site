import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import { useRef } from 'react';
import { useCreateGetMutation } from '../../redux/get/getApiSlice.js';
import GetForm from '../../components/form/page-forms/GetForm.jsx';

export default function CreateGetPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const previousPath = useRef(location.state?.from?.pathname ?? '/admin/get');

    const [createGet, { isLoading }] = useCreateGetMutation();

    const handleSubmit = async (values) => {
        try {
            await createGet({ data: values }).unwrap();
            navigate('/admin/get');
            acceptHandler('Запис успішно доданий');
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
                    { title: 'Benefit', to: '/admin/get' },
                    { title: 'Create benefit' },
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Create benefit">
                    <GetForm
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
