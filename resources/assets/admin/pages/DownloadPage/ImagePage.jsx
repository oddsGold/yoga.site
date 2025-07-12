import PageBreadcrumb from '../../components/common/PageBreadCrumb.jsx';
import PageMeta from '../../components/common/PageMeta.jsx';
import ComponentCard from '../../components/common/ComponentCard.jsx';
import { useCrudPageLogic } from '../../hooks/useCrudPageLogic.js';
import {
  useDeleteImageMutation,
  useImagesQuery,
  useUploadMutation,
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

export default function ImagePage() {
  const imageAccept = {
    'image/*': ['.jpeg', '.jpg', '.png', '.svg', '.webp', '.svg+xml'],
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
    useQuery: useImagesQuery,
    useDeleteMutation: useDeleteImageMutation,
  });

  const [uploadImage, { isLoading: isLoadingImage }] = useUploadMutation();

  const handleSubmit = async (file) => {
    try {
      await uploadImage(file).unwrap();
      acceptHandler();
    } catch (err) {
      errorHandler(err.data.message);
    }
  };

  const isLoadingData = isLoadingImage || isLoading;

  return (
    <>
      <PageMeta title="Image page" description="Image page" />
      <PageBreadcrumb pageTitle="Images" />
      <div className="space-y-6">
        <ComponentCard title="Dropzone">
          {isLoadingData ? (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-3xl">
              <Loading />
            </div>
          ) : (
            <>
              <FileDropzone accept={imageAccept} handleSubmit={handleSubmit} />
              <FileList data={data} handleDelete={handleOpenDialog} />

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
                title="image"
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
