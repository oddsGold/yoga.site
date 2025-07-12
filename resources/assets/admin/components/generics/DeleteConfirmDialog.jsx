import React from 'react';
import ModalPopup from './Modal.jsx';

const DeleteConfirmDialog = ({
  openDialog,
  title,
  handleDelete,
  handleCloseDialog,
  itemToDelete,
}) => {
  return (
    <ModalPopup
      open={openDialog}
      content={`Are you sure you want to delete the ${title.toLowerCase()}`}
      onConfirm={handleDelete}
      onCancel={handleCloseDialog}
      name={
        itemToDelete
          ? itemToDelete.name ||
            itemToDelete.title ||
            itemToDelete.login ||
            itemToDelete.origin ||
            `with id ${itemToDelete.id}`
          : ''
      }
    />
  );
};

export default DeleteConfirmDialog;
