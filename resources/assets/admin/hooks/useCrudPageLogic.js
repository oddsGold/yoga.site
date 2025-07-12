import { useEffect, useState } from 'react';
import { errorHandler } from '../components/utils/toastHandler.js';

export function useCrudPageLogic({ useQuery, useDeleteMutation = null, initialLimit = 30 }) {
  const [size, setSize] = useState(30);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [sort, setSort] = useState('-id');
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const [filters, setFilters] = useState({});
  const queryParams = {
    page,
    limit,
    sort,
    ...(filters || {}),
  };

  const { data: response, isLoading } = useQuery(queryParams);
  const [deleteItem] = useDeleteMutation ? useDeleteMutation() : [() => {}];

  const data = response?.data || [];
  const meta = response?.meta || {};

  useEffect(() => {
    if (page === 1) {
      setItems(response?.data || []);
    } else if (data?.length > 0) {
      setItems((prev) => [...prev, ...data]);
    }

    if (meta?.total && items.length + data.length >= meta.total) {
      setHasMore(false);
    }

    setIsFetchingMore(false);
  }, [response]);

  const loadMore = () => {
    if (hasMore && !isLoading) {
      setIsFetchingMore(true);
      setPage((prev) => prev + 1);
    }
  };

  const handleChange = (event) => {
    setLimit(event.target.value);
    setSize(event.target.value);
    setPage(1);
  };

  const handleOpenDialog = (item) => {
    setItemToDelete(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setItemToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await deleteItem(itemToDelete.id).unwrap();
      setOpenDialog(false);
      setItemToDelete(null);
    } catch (err) {
      errorHandler(err?.data?.message || err?.message || '');
      setOpenDialog(false);
      setItemToDelete(null);
    }
  };

  return {
    size,
    page,
    limit,
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
    setPage,
    setLimit,
    meta,
    items,
    loadMore,
    hasMore,
    isFetchingMore,
    setFilters,
  };
}
