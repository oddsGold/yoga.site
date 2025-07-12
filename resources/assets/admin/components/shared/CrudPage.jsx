import React from 'react';
import BasicTable from '../tables/BasicTables/BasicTable.jsx';
import { useCrudPageLogic } from '../../hooks/useCrudPageLogic.js';
import { Loading } from '../loadingBar/Loading.jsx';
import DeleteConfirmDialog from '../generics/DeleteConfirmDialog.jsx';
import { DropdownItem } from '../ui/dropdown/DropdownItem.jsx';

export default function CrudPage({
                                     buttonTitle,
                                     createPath = false,
                                     editPath = false,
                                     gridHeaderRow = [],
                                     useQuery,
                                     useDeleteMutation,
                                     isFilter = false,
                                     isSearch = false,
                                     dnd = false,
                                     remove = true,
})
{
    const {
        size,
        sort,
        openDialog,
        itemToDelete,
        data,
        isLoading,
        handleChange,
        handleOpenDialog,
        handleCloseDialog,
        handleDelete,
        setSort,
        page,
        setPage,
        meta,
        setFilters,
    } = useCrudPageLogic({ useQuery, useDeleteMutation });

    if (isLoading) {
        return (
            <div
                className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-3xl">
                <Loading />
            </div>
        );
    }

    const isEmptyData =
        !data ||
        (Array.isArray(data) && data.length === 0) ||
        (typeof data === 'object' && Object.keys(data).length === 0);

    return (
        <>
            {isEmptyData ? (
                <>
                    {createPath && (
                        <DropdownItem
                            tag="a"
                            to={`${createPath}`}
                            state={{ from: location }}
                            baseClassName="inline-flex"
                            className="flex items-center bg-brand-500 text-white shadow-theme-xs disabled:bg-brand-300 gap-3 px-3 py-2 font-medium rounded-lg text-theme-sm dark:hover:text-gray-300"
                        >
                            Create {buttonTitle}
                        </DropdownItem>
                    )}

                    <div className="text-lg font-medium text-gray-800 dark:text-white/90">Data not found</div>
                </>
            ) : (
                <>
                    <BasicTable
                        buttonTitle={`Create ${buttonTitle.toLowerCase()}`}
                        setCreatePath={createPath}
                        setEditPath={editPath}
                        gridHeaderRow={gridHeaderRow}
                        data={data}
                        handleDelete={handleOpenDialog}
                        sort={sort}
                        setSort={setSort}
                        setPage={setPage}
                        page={page}
                        size={size}
                        handleChange={handleChange}
                        search={isSearch}
                        meta={meta}
                        isFilter={isFilter}
                        setFilters={setFilters}
                        isLoading={isLoading}
                        dnd={dnd}
                        remove={remove}
                    />

                    <DeleteConfirmDialog
                        openDialog={openDialog}
                        title={buttonTitle}
                        handleDelete={handleDelete}
                        handleCloseDialog={handleCloseDialog}
                        itemToDelete={itemToDelete}
                    />
                </>
            )}
        </>
    );
}
