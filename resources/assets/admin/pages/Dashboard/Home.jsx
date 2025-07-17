import PageMeta from '../../components/common/PageMeta.jsx';
import { useNewsQuery } from '../../redux/dashboard/dashboardApiSlice.js';
import { Loading } from '../../components/loadingBar/Loading.jsx';

export default function Home() {
    const { data, isLoading, isError } = useNewsQuery();

    if (isLoading) {
        return (
            <div className="relative min-h-[300px]">
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-3xl">
                    <Loading />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4">
                <p>Не вдалося завантажити новини. Будь ласка, спробуйте пізніше.</p>
            </div>
        );
    }

    return (
        <>
            <PageMeta
                title="Новини про йогу | Ваш додаток"
                description="Останні новини про йогу, медитацію та здорове життя"
            />

            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12">
                    <h1 className="text-2xl font-bold mb-6">News</h1>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {data?.map((newsItem, index) => (
                            <a
                                href={newsItem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="relative h-48 overflow-hidden">
                                    {newsItem.photo_url ? (
                                        <img
                                            src={newsItem.photo_url}
                                            alt={newsItem.title}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                            <span className="text-gray-500 dark:text-gray-400">Немає зображення</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                                        <p
                                            className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                        >
                                            {newsItem.title}
                                        </p>
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                                        {newsItem.snippet}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                        <span>
                                            {newsItem.source_name}
                                        </span>
                                        <span>
                                            {new Date(newsItem.published_datetime_utc).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {data?.data?.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">Наразі немає новин. Спробуйте пізніше.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
