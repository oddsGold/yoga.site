import React from 'react';
import Button from '../../ui/button/Button.jsx';
import MultiSelect from '../../form/MultiSelect.jsx';
import { Modal } from './index.jsx';
import { Loading } from '../../loadingBar/Loading.jsx';

const FilterModal = ({
  isOpen,
  closeModal,
  multiOptions,
  setSelectedStatuses,
  handleSubmit,
  isLoading,
}) => (
  <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
    <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Налаштування фільтрів
        </h4>
      </div>

      <div className="flex flex-col">
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-3xl">
            <Loading />
          </div>
        )}
        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
          <div className="mt-7">
            <MultiSelect
              options={multiOptions}
              onChange={(newSelectedOptions) => {
                const selectedWithText = multiOptions.filter((option) =>
                  newSelectedOptions.includes(option.value)
                );

                setSelectedStatuses({
                  selectedValues: newSelectedOptions,
                  selectedOptions: selectedWithText,
                });
              }}
              className="dark:bg-gray-900"
              label="Оберіть варіанти для фільтрації"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={closeModal}>
            Close
          </Button>
          <Button size="sm" onClick={handleSubmit}>
            Apply filters
          </Button>
        </div>
      </div>
    </div>
  </Modal>
);

export default FilterModal;
