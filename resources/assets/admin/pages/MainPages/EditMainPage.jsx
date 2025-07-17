import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import React, { useRef } from 'react';
import { Loading } from '../../components/loadingBar/Loading.jsx';
import { useCurrentMainQuery, useUpdateMainMutation } from '../../redux/main/mainApiSlice.js';
import ProgramForm from '../../components/form/page-forms/ProgramForm.jsx';
import MainForm from '../../components/form/page-forms/MainForm.jsx';

export default function EditMainPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const previousPath = useRef(location.state?.from?.pathname ?? '/admin/main');

  const { data: currentMain, error, isLoading: isCurrentMainLoading } = useCurrentMainQuery(id);
  const [updateMain, { isLoading: isUpdateProgramLoading }] = useUpdateMainMutation();

  const isLoading = isCurrentMainLoading || isUpdateProgramLoading;

  const isEmptyData =
    !currentMain || (typeof currentMain === 'object' && Object.keys(currentMain).length === 0);

  const handleSubmit = async (values) => {
    try {
      await updateMain({ data: values }).unwrap();
      navigate('/admin/main');
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
          <PageMeta title="Edit main section" description="Edit main section" />
          <PageBreadcrumb
            breadcrumbs={[
              { title: 'Home', to: '/admin/dashboard' },
              { title: 'Main section', to: '/admin/main' },
              { title: 'Edit main section' },
            ]}
          />

          {isEmptyData ? (
            <div className="text-lg font-medium text-gray-800 dark:text-white/90">
              Data not found
            </div>
          ) : (
            <div className="space-y-6">
              <ComponentCard title="Edit main section">
                <MainForm
                  current={currentMain}
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
