import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import CrudPage from '../../components/shared/CrudPage.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useLinksQuery } from '../../redux/socialLinks/socialLinksApiSlice.js';

export default function SocialPage() {
  const gridHeaderRow = [
    { name: 'facebook', label: 'Facebook' },
    { name: 'instagram', label: 'Instagram' },
    { name: 'tik_tok', label: 'TikTok' },
    { name: 'you_tube', label: 'YouTube' },
    { name: 'telegram', label: 'Telegram' },
  ];

  return (
    <>
      <PageMeta title="Social links page" description="Social links page" />
      <PageBreadcrumb breadcrumbs={[{ title: 'Home', to: '/admin/dashboard' }, { title: 'Social links' }]} />
      <div className="space-y-6">
        <ComponentCard title="Social links">
          <CrudPage
            buttonTitle="Social link"
            editPath="/admin/social"
            gridHeaderRow={gridHeaderRow}
            useQuery={useLinksQuery}
            dnd={false}
            remove={false}
          />
        </ComponentCard>
      </div>
    </>
  );
}
