import { useRef, useCallback, useEffect, useState } from 'react';
import { errorHandler } from '../components/utils/toastHandler.js';

export const useDragAndDropUpdate = (initialData, updateApiFunction) => {
  const [localData, setLocalData] = useState(initialData);
  const timeoutRef = useRef(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    setLocalData(initialData);
  }, [initialData]);

  const updateApi = useCallback(
    async (newData) => {
      try {
        await updateApiFunction(newData);
      } catch (err) {
        errorHandler();
      }
    },
    [updateApiFunction]
  );

  const sendUpdateIfNotDragging = useCallback(
    (newData) => {
      if (!isDraggingRef.current) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          if (!isDraggingRef.current) {
            updateApi(newData);
          }
        }, 2000);
      }
    },
    [updateApi]
  );

  const handleDragStart = useCallback(() => {
    isDraggingRef.current = true;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const handleDragEnd = useCallback(
    (event, getNewData) => {
      const { active, over } = event;
      if (!over || active.id === over.id) {
        isDraggingRef.current = false;
        return;
      }

      const newData = getNewData(localData, active.id, over.id);
      setLocalData(newData);
      isDraggingRef.current = false;
      sendUpdateIfNotDragging(newData);
    },
    [localData, sendUpdateIfNotDragging]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    localData,
    handleDragStart,
    handleDragEnd,
  };
};
