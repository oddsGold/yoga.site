import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import React, { useRef } from 'react';
import { Loading } from '../../components/loadingBar/Loading.jsx';
import SocialForm from '../../components/form/page-forms/SocialForm.jsx';
import { useCurrentLinkQuery, useUpdateSocialMutation } from '../../redux/socialLinks/socialLinksApiSlice.js';

export default function EditSocialPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const previousPath = useRef(location.state?.from?.pathname ?? '/admin/social');

  const { data: currentLinks, error, isLoading: isCurrentLinksLoading } = useCurrentLinkQuery(id);
  const [updateLinks, { isLoading: isUpdateLinksLoading }] = useUpdateSocialMutation();

  const isLoading = isCurrentLinksLoading || isUpdateLinksLoading;

  const isEmptyData =
    !currentLinks || (typeof currentLinks === 'object' && Object.keys(currentLinks).length === 0);

  const handleSubmit = async (values) => {
    try {
      await updateLinks({ data: values }).unwrap();
      navigate('/admin/social');
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
          <PageMeta title="Edit links" description="Edit links" />
          <PageBreadcrumb
            breadcrumbs={[
              { title: 'Home', to: '/admin/dashboard' },
              { title: 'Social links', to: '/admin/social' },
              { title: 'Edit social links page' },
            ]}
          />

          {isEmptyData ? (
            <div className="text-lg font-medium text-gray-800 dark:text-white/90">
              Data not found
            </div>
          ) : (
            <div className="space-y-6">
              <ComponentCard title="Edit social links">
                <SocialForm
                  current={currentLinks}
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
