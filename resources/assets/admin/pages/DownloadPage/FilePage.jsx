import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useCrudPageLogic } from '../../hooks/useCrudPageLogic.js';
import {
  useDeleteFileMutation,
  useFilesQuery,
  useUploadFileMutation,
} from '../../redux/download/downloadApiSlice.js';
import { acceptHandler, errorHandler } from '../../components/utils/toastHandler.js';
import FileDropzone from '../../components/generics/FileDropzone.jsx';
import FileList from '../../components/download/FileList.jsx';
import { Loading } from '../../components/loadingBar/Loading.jsx';
import React from 'react';
import DeleteConfirmDialog from '../../components/generics/DeleteConfirmDialog.jsx';
import PaginationSelector from '../../components/generics/PaginationSelector.jsx';
import PaginationInfo from '../../components/generics/PaginationInfo.jsx';
import PagePagination from '../../components/generics/PagePagination.jsx';

export default function FilePage() {
  const fileAccept = {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc', '.docx'],
    'application/vnd.ms-excel': ['.xls', '.xlsx'],
    'text/plain': ['.txt'],
  };

  const {
    size,
    openDialog,
    itemToDelete,
    data,
    isLoading,
    handleChange,
    handleOpenDialog,
    handleCloseDialog,
    handleDelete,
    meta,
    page,
    setPage,
  } = useCrudPageLogic({
    useQuery: useFilesQuery,
    useDeleteMutation: useDeleteFileMutation,
  });

  const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();

  const handleSubmit = async (file) => {
    try {
      await uploadFile(file).unwrap();
      acceptHandler();
    } catch (err) {
      errorHandler(err.data.message);
    }
  };

  const isLoadingData = isLoadingFile || isLoading;

  return (
    <>
      <PageMeta title="File page" description="File page" />
      <PageBreadcrumb pageTitle="Files" />
      <div className="space-y-6">
        <ComponentCard title="Dropzone">
          {isLoadingData ? (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-3xl">
              <Loading />
            </div>
          ) : (
            <>
              <FileDropzone accept={fileAccept} handleSubmit={handleSubmit} />
              <FileList data={data} handleDelete={handleOpenDialog} file={true} />

              <div className="rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                  <PaginationInfo data={data} meta={meta} />
                  <PagePagination page={page} setPage={setPage} meta={meta} />
                </div>
              </div>

              <div className="flex flex-col justify-end gap-2 px-4 py-4 rounded-t-xl sm:flex-row sm:items-center">
                <PaginationSelector size={size} handleChange={handleChange} />
              </div>

              <DeleteConfirmDialog
                openDialog={openDialog}
                title="file"
                handleDelete={handleDelete}
                handleCloseDialog={handleCloseDialog}
                itemToDelete={itemToDelete}
              />
            </>
          )}
        </ComponentCard>
      </div>
    </>
  );
}
