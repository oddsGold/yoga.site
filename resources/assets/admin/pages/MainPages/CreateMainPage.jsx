import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import { useRef } from 'react';
import { useCreateMainMutation } from '../../redux/main/mainApiSlice.js';
import MainForm from '../../components/form/page-forms/MainForm.jsx';

export default function CreateMainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = useRef(location.state?.from?.pathname ?? '/admin/main');

  const [createMain, { isLoading }] = useCreateMainMutation();

  const handleSubmit = async (values) => {
    try {
      await createMain({ data: values }).unwrap();
      navigate('/admin/main');
      acceptHandler('Запис успішно доданий');
    } catch (err) {
      errorHandler(err.data.message);
    }
  };

  return (
    <>
      <PageMeta title="Create section" description="Create section" />
      <PageBreadcrumb
        breadcrumbs={[
          { title: 'Home', to: '/admin/dashboard' },
          { title: 'Main section', to: '/admin/main' },
          { title: 'Create section' },
        ]}
      />
      <div className="space-y-6">
        <ComponentCard title="Create section">
          <MainForm
            defaultCurrent={{
              title: '',
              description_1: '',
              description_2: ''
            }}
            handleSubmit={handleSubmit}
            backLinkPath={previousPath}
          />
        </ComponentCard>
      </div>
    </>
  );
}
