import React from 'react';
import PropTypes from 'prop-types';

const Toast = ({
  type, iconName, msg, title, onClick,
}) => (
  <div
    role="presentation"
    onClick={() => onClick && onClick()}
    onKeyDown={() => {}}
  >
    <span className={`toastify-content--icon toastify-content--${type}-icon`}>
      <i className={iconName} />
    </span>
    <div className={`toastify-content--message toastify-content--${type}-message`}>
      <strong>
        {title}
      </strong>
      <div className="toast-message">
        {msg}
      </div>
    </div>
  </div>
);

Toast.propTypes = {
  type: PropTypes.string,
  iconName: PropTypes.string,
  msg: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

Toast.defaultProps = {
  type: '',
  iconName: '',
  msg: '',
  title: '',
  onClick: () => {},
};

export default Toast;