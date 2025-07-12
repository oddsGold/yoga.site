import React, { useEffect, useState } from 'react';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import Label from '../Label.jsx';
import FormikInput from '../input/FormikInput.jsx';
import Button from '../../ui/button/Button.jsx';
import { errorHandler } from '../../utils/toastHandler.js';
import {
    useDeleteImageMutation,
    useImagesQuery,
    useUploadMutation,
} from '../../../redux/download/downloadApiSlice.js';
import FileList from '../../download/FileList.jsx';
import { useCrudPageLogic } from '../../../hooks/useCrudPageLogic.js';
import FileDropzone from '../../generics/FileDropzone.jsx';
import { Loading } from '../../loadingBar/Loading.jsx';
import PaginationInfo from '../../generics/PaginationInfo.jsx';
import { CardGrid } from '../../ui/card/CardGrid.jsx';
import { Link } from 'react-router-dom';
import GroupButtons from '../../ui/button/GroupButtons.jsx';

export default function VideoForm({
                                      current = null,
                                      defaultCurrent,
                                      handleSubmit,
                                      enableReinitialize = true,
                                      resources = [],
                                      backLinkPath,
                                  }) {
    const imageAccept = {
        'image/*': ['.jpeg', '.jpg', '.png', '.svg', '.webp', '.svg+xml'],
    };

    const { data, meta, items, loadMore, hasMore, isFetchingMore } = useCrudPageLogic({
        useQuery: useImagesQuery,
        useDeleteMutation: useDeleteImageMutation,
        initialLimit: 3,
    });

    const [selectionStep, setSelectionStep] = useState('desktop');
    const [uploadFile, { isLoading: isLoadingUploadFile }] = useUploadMutation();
    const [fileData, setFileData] = useState({
        desktop: current?.desktop_preview || null,
        tablet: current?.tablet_preview || null,
        mobile: current?.mobile_preview || null,
    });

    const [required, setRequired] = useState({
        desktop: false,
        tablet: false,
        mobile: false,
    });

    const handleFileUpload = async (formData, deviceType) => {
        try {
            const result = await uploadFile(formData).unwrap();
            setFileData(prev => ({
                ...prev,
                [deviceType]: result?.data || result?.preview, // Зберігаємо весь об'єкт
            }));
            setRequired(prev => ({
                ...prev,
                [deviceType]: false,
            }));
        } catch (err) {
            errorHandler(err?.data?.message || 'Upload error');
        }
    };

    const removeFileData = (deviceType) => {
        setFileData(prev => ({
            ...prev,
            [deviceType]: null,
        }));
    };

    const handleSelectImage = (item, deviceType) => {
        setFileData(prev => ({
            ...prev,
            [deviceType]: item
        }));
    };


    return (
        <div>
            <Formik
                initialValues={current ? current : defaultCurrent}
                enableReinitialize={enableReinitialize}
                validationSchema={Yup.object().shape({
                    title: Yup.string()
                        .max(255, 'Максимально допустимо 255 символів')
                        .min(3, 'Мінімально 3 символи')
                        .required('Поле необхідне до заповнення'),
                    url: Yup.string()
                        .max(255, 'Максимально допустимо 255 символів')
                        .required('Поле необхідне до заповнення'),
                })}
                onSubmit={(values) => {
                    try {
                        if (fileData.desktop && fileData.tablet && fileData.mobile) {
                            handleSubmit({
                                ...values,
                                desktop_preview: fileData.desktop,
                                tablet_preview: fileData.tablet,
                                mobile_preview: fileData.mobile,
                            });
                        } else {
                            setRequired({
                                desktop: !fileData.desktop,
                                tablet: !fileData.tablet,
                                mobile: !fileData.mobile,
                            });
                            errorHandler('Будь ласка, завантажте всі зображення');
                            setSubmitting(false);
                        }
                    } catch (error) {
                        console.error(error);
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting, handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
                    <Form autoComplete="off">
                        <div className="space-y-6">
                            <div className="pb-3">
                                <Label>
                                    Title <span className="text-error-500">*</span>{' '}
                                </Label>
                                <Field
                                    id="title"
                                    placeholder="Enter your title"
                                    name="title"
                                    autoFocus
                                    component={FormikInput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.title && touched.title)}
                                    helperText={touched.title && errors.title}
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="pb-3">
                                <Label>
                                    URL <span className="text-error-500">*</span>{' '}
                                </Label>
                                <Field
                                    id="url"
                                    placeholder="Enter url"
                                    name="url"
                                    autoFocus
                                    component={FormikInput}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.url && touched.url)}
                                    helperText={touched.url && errors.url}
                                />
                            </div>
                        </div>

                        {isLoadingUploadFile ? (
                            <div
                                className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-3xl">
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <div className="space-y-6">
                                    <div>
                                        <Label className="text-xl">Desktop image</Label>
                                        {!fileData.desktop ? (
                                            <FileDropzone
                                                accept={imageAccept}
                                                handleSubmit={(formData) => handleFileUpload(formData, 'desktop')}
                                                required={required.desktop}
                                            />
                                        ) : (
                                            <FileList
                                                data={[fileData.desktop]}
                                                removeFileData={() => removeFileData('desktop')}
                                            />
                                        )}
                                    </div>

                                    <div>
                                        <Label className="text-xl">Tablet image</Label>
                                        {!fileData.tablet ? (
                                            <FileDropzone
                                                accept={imageAccept}
                                                handleSubmit={(formData) => handleFileUpload(formData, 'tablet')}
                                                required={required.tablet}
                                            />
                                        ) : (
                                            <FileList
                                                data={[fileData.tablet]}
                                                removeFileData={() => removeFileData('tablet')}
                                            />
                                        )}
                                    </div>

                                    <div>
                                        <Label className="text-xl">Mobile image</Label>
                                        {!fileData.mobile ? (
                                            <FileDropzone
                                                accept={imageAccept}
                                                handleSubmit={(formData) => handleFileUpload(formData, 'mobile')}
                                                required={required.mobile}
                                            />
                                        ) : (
                                            <FileList
                                                data={[fileData.mobile]}
                                                removeFileData={() => removeFileData('mobile')}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="py-3">
                                    <GroupButtons
                                        backLinkPath={backLinkPath.current}
                                        isSubmitting={isSubmitting || !fileData}
                                    />
                                </div>

                                <Label>Виберіть з раніше завантажених:</Label>
                                <>
                                    <CardGrid
                                        data={items}
                                        handleSelectImage={handleSelectImage}
                                        currentStep={selectionStep}
                                        setFileData={setFileData}
                                        isFetchingMore={isFetchingMore}
                                        loadMore={loadMore}
                                        hasMore={hasMore}
                                    />

                                    <div
                                        className="rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
                                        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                                            <PaginationInfo data={data} meta={meta} onlyTo={true} />
                                        </div>
                                    </div>
                                </>
                            </>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
}
