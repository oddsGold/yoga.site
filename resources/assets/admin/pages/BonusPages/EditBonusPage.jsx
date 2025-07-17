import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import React, { useRef } from 'react';
import { Loading } from '../../components/loadingBar/Loading.jsx';
import { useCurrentBonusQuery, useUpdateBonusMutation } from '../../redux/bonus/bonusApiSlice.js';
import ProgramForm from '../../components/form/page-forms/ProgramForm.jsx';
import BonusForm from '../../components/form/page-forms/BonusForm.jsx';

export default function EditBonusPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const previousPath = useRef(location.state?.from?.pathname ?? '/admin/bonus');

  const { data: currentBonus, error, isLoading: isCurrentBonusLoading } = useCurrentBonusQuery(id);
  const [updateBonus, { isLoading: isUpdateBonusLoading }] = useUpdateBonusMutation();

  const isLoading = isCurrentBonusLoading || isUpdateBonusLoading;

  const isEmptyData =
    !currentBonus || (typeof currentBonus === 'object' && Object.keys(currentBonus).length === 0);

  const handleSubmit = async (values) => {
    try {
      await updateBonus({ data: values }).unwrap();
      navigate('/admin/bonus');
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
          <PageMeta title="Edit bonus" description="Edit bonus" />
          <PageBreadcrumb
            breadcrumbs={[
              { title: 'Home', to: '/admin/dashboard' },
              { title: 'Bonus', to: '/admin/bonus' },
              { title: 'Edit bonus page' },
            ]}
          />

          {isEmptyData ? (
            <div className="text-lg font-medium text-gray-800 dark:text-white/90">
              Data not found
            </div>
          ) : (
            <div className="space-y-6">
              <ComponentCard title="Edit bonus">
                <BonusForm
                  current={currentBonus}
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
