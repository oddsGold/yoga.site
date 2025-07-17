import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import { useRef } from 'react';
import { useCreateBonusMutation } from '../../redux/bonus/bonusApiSlice.js';
import BonusForm from '../../components/form/page-forms/BonusForm.jsx';

export default function CreateBonusPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = useRef(location.state?.from?.pathname ?? '/admin/bonus');

  const [createBonus, { isLoading }] = useCreateBonusMutation();

  const handleSubmit = async (values) => {
    try {
      await createBonus({ data: values }).unwrap();
      navigate('/admin/bonus');
      acceptHandler('Бонус успішно доданий');
    } catch (err) {
      errorHandler(err.data.message);
    }
  };

  return (
    <>
      <PageMeta title="Create new bonus" description="Create new bonus" />
      <PageBreadcrumb
        breadcrumbs={[
          { title: 'Home', to: '/admin/dashboard' },
          { title: 'Bonus', to: '/admin/bonus' },
          { title: 'Create bonus' },
        ]}
      />
      <div className="space-y-6">
        <ComponentCard title="Create bonus">
          <BonusForm
            defaultCurrent={{
              title: '',
              description: ''
            }}
            handleSubmit={handleSubmit}
            backLinkPath={previousPath}
          />
        </ComponentCard>
      </div>
    </>
  );
}
