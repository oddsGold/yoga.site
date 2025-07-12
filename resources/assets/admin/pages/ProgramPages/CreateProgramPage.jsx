import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import { useRef } from 'react';
import { useCreateProgramMutation } from '../../redux/program/programApiSlice.js';
import ProgramForm from '../../components/form/page-forms/ProgramForm.jsx';

export default function CreateProgramPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = useRef(location.state?.from?.pathname ?? '/admin/program');

  const [createFaq, { isLoading }] = useCreateProgramMutation();

  const handleSubmit = async (values) => {
    try {
      await createFaq({ data: values }).unwrap();
      navigate('/admin/program');
      acceptHandler('Програма успішно додана');
    } catch (err) {
      errorHandler(err.data.message);
    }
  };

  return (
    <>
      <PageMeta title="Create new program" description="Create user program" />
      <PageBreadcrumb
        breadcrumbs={[
          { title: 'Home', to: '/admin/dashboard' },
          { title: 'Programs', to: '/admin/program' },
          { title: 'Create program' },
        ]}
      />
      <div className="space-y-6">
        <ComponentCard title="Create program">
          <ProgramForm
            defaultCurrent={{
              title: '',
              description: ''
            }}
            handleSubmit={handleSubmit}
            backLinkPath={previousPath}
          />
        </ComponentCard>
      </div>
    </>
  );
}
