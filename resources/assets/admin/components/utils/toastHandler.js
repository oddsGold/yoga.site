import { toast } from 'react-toastify';

const errorHandler = (error) => {
  const defaultMessage = 'Щось пішло не так. Повторіть спробу пізніше';

  const message = error?.data?.message?.trim();
  const errors = error?.data?.errors;

  if (errors && typeof errors === 'object') {
    Object.values(errors).forEach((errorArr) => {
      if (Array.isArray(errorArr)) {
        errorArr.forEach((msg) => {
          toast.error(msg, { position: 'bottom-left' });
        });
      }
    });
  } else if (message) {
    toast.error(message, { position: 'bottom-left' });
  } else {
    toast.error(defaultMessage, { position: 'bottom-left' });
  }
};

const acceptHandler = (msg) =>
  toast.success(msg ? msg.trim() || 'Запис успішно створено' : 'Запис успішно створено', {
    position: 'bottom-left',
  });

export { errorHandler, acceptHandler };
