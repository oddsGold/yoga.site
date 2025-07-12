import PageMeta from '../../components/common/PageMeta.jsx';
import AuthLayout from './AuthPageLayout.jsx';
import SignInFormTfa from '../../components/auth/SignInFormTfa.jsx';

export default function SignInTfa() {
  return (
    <>
      <PageMeta title="SignIn Form" description="SignIn Form" />
      <AuthLayout>
        <SignInFormTfa />
      </AuthLayout>
    </>
  );
}
