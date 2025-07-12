import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import React, { useRef } from 'react';
import { Loading } from '../../components/loadingBar/Loading.jsx';
import { useCurrentProgramQuery, useUpdateProgramMutation } from '../../redux/program/programApiSlice.js';
import ProgramForm from '../../components/form/page-forms/ProgramForm.jsx';
import ProgramPage from './ProgramPage.jsx';

export default function EditProgramPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const previousPath = useRef(location.state?.from?.pathname ?? '/admin/program');

  const { data: currentProgram, error, isLoading: isCurrentProgramLoading } = useCurrentProgramQuery(id);
  const [updateProgram, { isLoading: isUpdateProgramLoading }] = useUpdateProgramMutation();

  const isLoading = isCurrentProgramLoading || isUpdateProgramLoading;

  const isEmptyData =
    !currentProgram || (typeof currentProgram === 'object' && Object.keys(currentProgram).length === 0);

  const handleSubmit = async (values) => {
    try {
      await updateProgram({ data: values }).unwrap();
      navigate('/admin/program');
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
              { title: 'Program', to: '/admin/program' },
              { title: 'Edit program page' },
            ]}
          />

          {isEmptyData ? (
            <div className="text-lg font-medium text-gray-800 dark:text-white/90">
              Data not found
            </div>
          ) : (
            <div className="space-y-6">
              <ComponentCard title="Edit program">
                <ProgramForm
                  current={currentProgram}
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
