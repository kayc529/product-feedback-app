import { toast } from 'react-toastify';

export const TOAST_TYPE = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  INFO: 'INFO',
  DEFAULT: 'DEFAULT',
};

export const toastMessage = (msg, type = TOAST_TYPE.DEFAULT) => {
  switch (type) {
    case TOAST_TYPE.SUCCESS:
      toast.success(msg);
      break;
    case TOAST_TYPE.ERROR:
      toast.error(msg);
      break;
    case TOAST_TYPE.INFO:
      toast.info(msg);
      break;
    default:
      toast(msg);
      break;
  }
};
