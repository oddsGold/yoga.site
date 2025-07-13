import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import { useRef } from 'react';
import { useCreateVideoMutation } from '../../redux/author/authorApiSlice.js';
import AuthorForm from '../../components/form/page-forms/AuthorForm.jsx';

export default function CreateAuthorPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const previousPath = useRef(location.state?.from?.pathname ?? '/admin/author');

    const [createVideo, { isLoading }] = useCreateVideoMutation();

    const handleSubmit = async (values) => {
        try {
            await createVideo({ data: values }).unwrap();
            navigate('/admin/author');
            acceptHandler('Автор успішно доданий');
        } catch (err) {
            errorHandler(err.data.message);
        }
    };

    return (
        <>
            <PageMeta title="Create new author" description="Create new author" />
            <PageBreadcrumb
                breadcrumbs={[
                    { title: 'Home', to: '/admin/dashboard' },
                    { title: 'Author', to: '/admin/author' },
                    { title: 'Create author' },
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Create author">
                    <AuthorForm
                        defaultCurrent={{
                            title: '',
                            description: '',
                        }}
                        handleSubmit={handleSubmit}
                        backLinkPath={previousPath}
                    />
                </ComponentCard>
            </div>
        </>
    );
}
