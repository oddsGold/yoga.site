import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import React, { useRef } from 'react';
import { Loading } from '../../components/loadingBar/Loading.jsx';
import { useCurrentGetQuery, useUpdateGetMutation } from '../../redux/get/getApiSlice.js';
import GetForm from '../../components/form/page-forms/GetForm.jsx';

export default function EditGetPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const previousPath = useRef(location.state?.from?.pathname ?? '/admin/worth');

  const { data: currentGet, error, isLoading: isCurrentGetLoading } = useCurrentGetQuery(id);
  const [updateGet, { isLoading: isUpdateGetLoading }] = useUpdateGetMutation();

  const isLoading = isCurrentGetLoading || isUpdateGetLoading;

  const isEmptyData =
    !currentGet || (typeof currentGet === 'object' && Object.keys(currentGet).length === 0);

  const handleSubmit = async (values) => {
    try {
      await updateGet({ data: values }).unwrap();
      navigate('/admin/get');
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
          <PageMeta title="Edit benefit" description="Edit benefit" />
          <PageBreadcrumb
            breadcrumbs={[
              { title: 'Home', to: '/admin/dashboard' },
              { title: 'Benefit', to: '/admin/get' },
              { title: 'Edit benefit page' },
            ]}
          />

          {isEmptyData ? (
            <div className="text-lg font-medium text-gray-800 dark:text-white/90">
              Data not found
            </div>
          ) : (
            <div className="space-y-6">
              <ComponentCard title="Edit benefit">
                <GetForm
                  current={currentGet}
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
