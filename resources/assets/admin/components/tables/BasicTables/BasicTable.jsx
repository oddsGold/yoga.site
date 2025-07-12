import { DropdownItem } from '../../ui/dropdown/DropdownItem.jsx';
import { useLocation } from 'react-router-dom';
import PaginationSelector from '../../generics/PaginationSelector.jsx';
import React, { useState } from 'react';
import SearchInput from '../../generics/SeatchInput.jsx';
import PagePagination from '../../generics/PagePagination.jsx';
import PaginationInfo from '../../generics/PaginationInfo.jsx';
import Filter from '../../form/filter.jsx';
import { useModal } from '../../../hooks/useModal.js';
import DataTable from '../DataTable.jsx';
import FilterModal from '../../ui/modal/FilterModal.jsx';
import { useFilters } from '../../../hooks/useFilters.js';
import FilterButton from '../../ui/button/FilterButton.jsx';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { closestCorners, DndContext } from '@dnd-kit/core';

const multiOptions = [
    { value: '1', label: 'Option 1', selected: false },
    { value: '2', label: 'Option 2', selected: false },
    { value: '3', label: 'Option 3', selected: false },
    { value: '4', label: 'Option 4', selected: false },
    { value: '5', label: 'Option 5', selected: false },
];

export default function BasicTable({
                                       buttonTitle,
                                       gridHeaderRow,
                                       data,
                                       setCreatePath,
                                       setEditPath,
                                       handleDelete,
                                       sort = '',
                                       setSort,
                                       setPage,
                                       page,
                                       size,
                                       handleChange,
                                       search,
                                       meta,
                                       isFilter,
                                       setFilters,
                                       isLoading,
                                       dnd,
                                       remove
                                   }) {
    const location = useLocation();
    const { isOpen, openModal, closeModal } = useModal();

    const { selectedStatuses, removeFilter, addFilter, setSelectedStatuses } = useFilters(
        { selectedValues: [], selectedOptions: [] },
        setFilters,
        setPage,
    );

    const [filtersApplied, setFiltersApplied] = useState(false);

    const closeModalWithReset = () => {
        setFiltersApplied(false);
        setSelectedStatuses({ selectedValues: [], selectedOptions: [] });
        closeModal();
    };

    const renderSelectedFilters = () => {
        if (selectedStatuses.selectedOptions.length > 0) {
            return selectedStatuses.selectedOptions.map((status) => (
                <FilterButton key={status.value} status={status} removeFilter={removeFilter} />
            ));
        }
    };

    const handleSubmit = (values) => {
        setFilters({ status: selectedStatuses.selectedValues });
        setPage(1);
        setFiltersApplied(true);
        closeModal();
    };

    return (
        <>
            {setCreatePath && (
                <DropdownItem
                    tag="a"
                    to={`${setCreatePath}`}
                    state={{ from: location }}
                    baseClassName="inline-flex"
                    className="flex items-center bg-brand-500 text-white shadow-theme-xs disabled:bg-brand-300 gap-3 px-3 py-2 font-medium rounded-lg text-theme-sm dark:hover:text-gray-300"
                >
                    {buttonTitle}
                </DropdownItem>
            )}

            <div
                className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    {isFilter && (
                        <div
                            className="flex flex-col gap-2 px-4 py-4 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-end">
                            <div className="flex gap-2">
                                {filtersApplied && renderSelectedFilters()}
                                <Filter openModal={openModal} />
                            </div>
                        </div>
                    )}

                    <div
                        className={`flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] sm:flex-row sm:items-center sm:justify-between ${!isFilter ? 'rounded-t-xl' : ''}`}
                    >
                        <PaginationSelector size={size} handleChange={handleChange} />
                        {search && <SearchInput />}
                    </div>

                    <DataTable
                        data={data}
                        gridHeaderRow={gridHeaderRow}
                        handleDelete={handleDelete}
                        setEditPath={setEditPath}
                        location={location}
                        sort={sort}
                        setSort={setSort}
                        dnd={dnd}
                        remove={remove}
                    />

                    <div
                        className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
                        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                            <PaginationInfo data={data} meta={meta} />
                            <PagePagination page={page} setPage={setPage} meta={meta} />
                        </div>
                    </div>
                </div>
            </div>

            <FilterModal
                isOpen={isOpen}
                closeModal={closeModalWithReset}
                multiOptions={multiOptions}
                setSelectedStatuses={setSelectedStatuses}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </>
    );
}
