import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import React, { useRef } from 'react';
import { Loading } from '../../components/loadingBar/Loading.jsx';
import { useCurrentFaqQuery, useUpdateFaqMutation } from '../../redux/faq/faqApiSlice.js';
import FaqForm from '../../components/form/page-forms/FaqForm.jsx';

export default function EditFaqPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const previousPath = useRef(location.state?.from?.pathname ?? '/admin/faqs');

  const { data: currentFaq, error, isLoading: isCurrentFaqLoading } = useCurrentFaqQuery(id);
  const [updateFaq, { isLoading: isUpdateFaqLoading }] = useUpdateFaqMutation();

  const isLoading = isCurrentFaqLoading || isUpdateFaqLoading;

  const isEmptyData =
    !currentFaq || (typeof currentFaq === 'object' && Object.keys(currentFaq).length === 0);

  const handleSubmit = async (values) => {
    try {
      await updateFaq({ data: values }).unwrap();
      navigate('/admin/faqs');
      acceptHandler('Запис успішно відредаговано');
    } catch (err) {
      errorHandler(err.data.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-3xl">
          <Loading />
        </div>
      ) : (
        <>
          <PageMeta title="Edit faq" description="Edit faq" />
          <PageBreadcrumb
            breadcrumbs={[
              { title: 'Home', to: '/admin/dashboard' },
              { title: 'FAQ', to: '/admin/faqs' },
              { title: 'Edit faq page' },
            ]}
          />

          {isEmptyData ? (
            <div className="text-lg font-medium text-gray-800 dark:text-white/90">
              Data not found
            </div>
          ) : (
            <div className="space-y-6">
              <ComponentCard title="Edit FAQ">
                <FaqForm
                  current={currentFaq}
                  handleSubmit={handleSubmit}
                  backLinkPath={previousPath}
                />
              </ComponentCard>
            </div>
          )}
        </>
      )}
    </>
  );
}
