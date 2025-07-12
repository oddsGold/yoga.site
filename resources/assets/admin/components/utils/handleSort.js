export const handleSort = (column, sort, setSort) => {
  if (typeof setSort === 'function') {
    const isAsc = sort === column;
    setSort(isAsc ? `-${column}` : column);
  }
};
