import { useState } from 'react';

export function useFilters(
  initialFilters = { selectedValues: [], selectedOptions: [] },
  setFilters,
  setPage
) {
  const [selectedStatuses, setSelectedStatuses] = useState(initialFilters);

  const removeFilter = (value) => {
    setSelectedStatuses((prevState) => {
      const newSelectedValues = prevState.selectedValues.filter((item) => item !== value);
      const newSelectedOptions = prevState.selectedOptions.filter(
        (option) => option.value !== value
      );

      setFilters({ status: newSelectedValues });
      setPage(1);

      return {
        selectedValues: newSelectedValues,
        selectedOptions: newSelectedOptions,
      };
    });
  };

  const addFilter = (newFilter) => {
    setSelectedStatuses((prevState) => {
      const newSelectedValues = [...prevState.selectedValues, newFilter.value];
      const newSelectedOptions = [...prevState.selectedOptions, newFilter];

      setFilters({ status: newSelectedValues });

      return {
        selectedValues: newSelectedValues,
        selectedOptions: newSelectedOptions,
      };
    });
  };

  return {
    selectedStatuses,
    setSelectedStatuses,
    removeFilter,
    addFilter,
  };
}
