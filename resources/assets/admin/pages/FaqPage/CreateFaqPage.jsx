import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import { useRef } from 'react';
import { useCreateFaqMutation } from '../../redux/faq/faqApiSlice.js';
import FaqForm from '../../components/form/page-forms/FaqForm.jsx';

export default function CreateFaqPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = useRef(location.state?.from?.pathname ?? '/admin/faqs');

  const [createFaq, { isLoading }] = useCreateFaqMutation();

  const handleSubmit = async (values) => {
    try {
      await createFaq({ data: values }).unwrap();
      navigate('/admin/faqs');
      acceptHandler('Faq успішно доданий');
    } catch (err) {
      errorHandler(err.data.message);
    }
  };

  return (
    <>
      <PageMeta title="Create new faq" description="Create user faq" />
      <PageBreadcrumb
        breadcrumbs={[
          { title: 'Home', to: '/admin/dashboard' },
          { title: 'Faq', to: '/admin/faqs' },
          { title: 'Create faq' },
        ]}
      />
      <div className="space-y-6">
        <ComponentCard title="Create faq">
          <FaqForm
            defaultCurrent={{
              title: '',
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
