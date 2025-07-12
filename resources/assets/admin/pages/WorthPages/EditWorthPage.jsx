import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import React, { useRef } from 'react';
import { Loading } from '../../components/loadingBar/Loading.jsx';
import { useCurrentWorthQuery, useUpdateWorthMutation } from '../../redux/worth/worthApiSlice.js';
import WorthForm from '../../components/form/page-forms/WorthForm.jsx';

export default function EditWorthPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const previousPath = useRef(location.state?.from?.pathname ?? '/admin/worth');

  const { data: currentWorth, error, isLoading: isCurrentWorthLoading } = useCurrentWorthQuery(id);
  const [updateWorth, { isLoading: isUpdateWorthLoading }] = useUpdateWorthMutation();

  const isLoading = isCurrentWorthLoading || isUpdateWorthLoading;

  const isEmptyData =
    !currentWorth || (typeof currentWorth === 'object' && Object.keys(currentWorth).length === 0);

  const handleSubmit = async (values) => {
    try {
      await updateWorth({ data: values }).unwrap();
      navigate('/admin/worth');
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
          <PageMeta title="Edit reason" description="Edit reason" />
          <PageBreadcrumb
            breadcrumbs={[
              { title: 'Home', to: '/admin/dashboard' },
              { title: 'Reason', to: '/admin/worth' },
              { title: 'Edit reason page' },
            ]}
          />

          {isEmptyData ? (
            <div className="text-lg font-medium text-gray-800 dark:text-white/90">
              Data not found
            </div>
          ) : (
            <div className="space-y-6">
              <ComponentCard title="Edit reason">
                <WorthForm
                  current={currentWorth}
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
