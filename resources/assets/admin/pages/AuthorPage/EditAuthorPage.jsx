import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useRef } from 'react';
import { useCurrentVideoQuery, useUpdateVideoMutation } from '../../redux/author/authorApiSlice.js';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import { Loading } from '../../components/loadingBar/Loading.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import AuthorForm from '../../components/form/page-forms/AuthorForm.jsx';

export default function EditAuthorPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const previousPath = useRef(location.state?.from?.pathname ?? '/admin/author');

  const { data: currentVideo, error, isLoading: isCurrentVideoLoading } = useCurrentVideoQuery(id);
  const [updateVideo, { isLoading: isUpdateVideoLoading }] = useUpdateVideoMutation();

  const isEmptyData =
    !currentVideo || (typeof currentVideo === 'object' && Object.keys(currentVideo).length === 0);

  const isLoading = isCurrentVideoLoading || isUpdateVideoLoading;

  const handleSubmit = async (values) => {
    try {
      await updateVideo({ data: values }).unwrap();
      acceptHandler('Запис успішно відредаговано');
      navigate('/admin/author');
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
          <PageMeta title="Edit author" description="Edit author" />
          <PageBreadcrumb
            breadcrumbs={[
              { title: 'Home', to: '/admin/dashboard' },
              { title: 'Author', to: '/admin/author' },
              { title: 'Edit author page' },
            ]}
          />

          {isEmptyData ? (
            <div className="text-lg font-medium text-gray-800 dark:text-white/90">
              Data not found
            </div>
          ) : (
            <div className="space-y-6">
              <ComponentCard title="Edit author">
                <AuthorForm
                  current={currentVideo}
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
