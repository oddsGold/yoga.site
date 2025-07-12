import React from 'react';
import { Link } from 'react-router-dom';

export function CardGrid({
                             data,
                             handleSelectImage,
                             currentStep,
                             handleDelete = null,
                             isFetchingMore,
                             loadMore,
                             hasMore,
                             ...rest
                         }) {
    const { setFileData } = rest;

    const getStepName = (step) => {
        switch(step) {
            case 'desktop': return 'Desktop';
            case 'tablet': return 'Tablet';
            case 'mobile': return 'Mobile';
            default: return '';
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {data.map((item, index) => (
                    <div key={index}>
                        <div
                            className="rounded-xl relative border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03]">
                            <div className="group relative mb-5 overflow-hidden rounded-lg h-48">
                                <img
                                    src={item.url}
                                    alt={item.origin}
                                    className="h-full w-full object-cover rounded-lg"
                                />

                                <div
                                    className="hidden group-hover:block transition-opacity duration-300 absolute top-0 left-0 w-full h-full p-2 dark:bg-gray-900">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                        <b>Оригінальне ім'я:</b>
                                        <span className="block">{item.origin}</span>
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                        <b>Поточне ім'я:</b>
                                        <span className="block">{item.name}</span>
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        <b>Дата завантаження:</b>
                                        <span className="block">{item.created_at}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3">
                                <div className="flex flex-col gap-2">
                                    {/* Основна кнопка View */}
                                    <Link
                                        to={item.url}
                                        target="_blank"
                                        className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-500 transition-colors"
                                        data-discover="true"
                                    >
                                        Переглянути
                                    </Link>

                                    <div className="grid grid-cols-3 gap-2">
                                        <div
                                            onClick={() => handleSelectImage(item, 'desktop')}
                                            className="inline-flex cursor-pointer items-center justify-center px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-colors"
                                            title="Обрати для десктопу"
                                        >
                                            🖥️ Add to desktop
                                        </div>

                                        <div
                                            onClick={() => handleSelectImage(item, 'tablet')}
                                            className="inline-flex cursor-pointer items-center justify-center px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-colors"
                                            title="Обрати для планшету"
                                        >
                                            💻 Add to tablet
                                        </div>

                                        <div
                                            onClick={() => handleSelectImage(item, 'mobile')}
                                            className="inline-flex cursor-pointer items-center justify-center px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-colors"
                                            title="Обрати для мобільного"
                                        >
                                            📱 Add to mobile
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className="flex w-full justify-center mt-6">
                    <button
                        onClick={loadMore}
                        disabled={isFetchingMore}
                        className="px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition"
                    >
                        {isFetchingMore ? 'Завантаження...' : 'Показати більше'}
                    </button>
                </div>
            )}
        </>
    );
}
