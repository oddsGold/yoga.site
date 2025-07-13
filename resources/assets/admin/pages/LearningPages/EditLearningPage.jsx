import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import React, { useRef } from 'react';
import { Loading } from '../../components/loadingBar/Loading.jsx';
import ProgramForm from '../../components/form/page-forms/ProgramForm.jsx';
import { useCurrentLearningQuery, useUpdateLearningMutation } from '../../redux/learning/learningApiSlice.js';
import LearningForm from '../../components/form/page-forms/LearningForm.jsx';

export default function EditLearningPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const previousPath = useRef(location.state?.from?.pathname ?? '/admin/learning');

  const { data: currentLearning, error, isLoading: isCurrentLearningLoading } = useCurrentLearningQuery(id);
  const [updateLearning, { isLoading: isUpdateLearningLoading }] = useUpdateLearningMutation();

  const isLoading = isCurrentLearningLoading || isUpdateLearningLoading;

  const isEmptyData =
    !currentLearning || (typeof currentLearning === 'object' && Object.keys(currentLearning).length === 0);

  const handleSubmit = async (values) => {
    try {
      await updateLearning({ data: values }).unwrap();
      navigate('/admin/learning');
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
          <PageMeta title="Edit learning process" description="Edit learning process" />
          <PageBreadcrumb
            breadcrumbs={[
              { title: 'Home', to: '/admin/learning' },
              { title: 'Learning process', to: '/admin/learning' },
              { title: 'Edit learning process' },
            ]}
          />

          {isEmptyData ? (
            <div className="text-lg font-medium text-gray-800 dark:text-white/90">
              Data not found
            </div>
          ) : (
            <div className="space-y-6">
              <ComponentCard title="Edit learning process">
                <LearningForm
                  current={currentLearning}
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
