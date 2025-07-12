import GridShape from '../../components/common/GridShape.jsx';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/common/PageMeta.jsx';
import error from '../../../images/error/404.svg';
import errorDark from '../../../images/error/404-dark.svg';

export default function NotFound() {
  return (
    <>
      <PageMeta
        title="React.js 404 Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js 404 Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="relative flex flex-col items-center justify-center p-6 overflow-hidden z-1">
        <GridShape />
        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
          <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
            ERROR
          </h1>

          <img src={error} alt="404" className="dark:hidden" />
          <img src={errorDark} alt="404" className="hidden dark:block" />

          <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
            Здається, ми не можемо знайти сторінку, яку ви шукаєте!
          </p>

          <Link
            to="/admin/dashboard"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            Back to Home Page
          </Link>
        </div>
      </div>
    </>
  );
}
