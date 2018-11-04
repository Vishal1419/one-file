import React from 'react';
import { toast } from 'react-toastify';

import Toast from './Toast';

let toastId = null;
const options = {
  autoClose: 5000,
  hideProgressBar: true,
  pauseOnHover: true,
  className: 'new alert',
};

export const info = (msg, title, onClick) => {
  if (!toast.isActive(toastId)) {
    toastId = toast.info(
      <Toast
        type="info"
        iconName="fas fa-info-circle"
        msg={msg}
        title={title || 'Information for you'}
        onClick={onClick}
      />,
      options,
    );
  }
};

export const warning = (msg, title, onClick) => {
  if (!toast.isActive(toastId)) {
    toastId = toast.warning(
      <Toast
        type="warning"
        iconName="fas fa-exclamation-triangle"
        msg={msg}
        title={title || 'Don\'t fear, this is just a warning!'}
        onClick={onClick}
      />,
      options,
    );
  }
};

export const error = (msg, title, onClick) => {
  if (!toast.isActive(toastId)) {
    toastId = toast.error(
      <Toast
        type="error"
        iconName="fas fa-bug"
        msg={msg}
        title={title || 'oh! snap'}
        onClick={onClick}
      />,
      options,
    );
  }
};

export const success = (msg, title, onClick) => {
  if (!toast.isActive(toastId)) {
    toastId = toast.success(
      <Toast
        type="success"
        iconName="fas fa-thumbs-up"
        msg={msg}
        title={title || 'Well done!'}
        onClick={onClick}
      />,
      options,
    );
  }
};
