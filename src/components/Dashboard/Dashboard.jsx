import React from 'react';
import PropTypes from 'prop-types';
import BlockUI from 'react-block-ui';

import { noop } from '../../utils';

const Dashboard = ({ loading, loadingMessage, createOneFile }) => (
  <div className="dashboard">
    <BlockUI
      tag="div"
      className="full-screen"
      blocking={loading}
      loader={
        <div className="waiting-loader">
          <i className="fas fa-spinner fa-pulse" />
          <p className="loader-text">{loadingMessage}</p>
        </div>
      }
    >
      <div className="buttons">
        <button
          type="button"
          className="btn-gstr1"
          onClick={() => {
            createOneFile('GSTR1', []);
          }}
        >
          GSTR1
        </button>
        <button
          type="button"
          className="btn-gstr2"
          onClick={() => {
            createOneFile('GSTR2', []);
          }}
        >
          GSTR2
        </button>
        <button
          type="button"
          className="btn-gstr4"
          onClick={() => {
            createOneFile('GSTR4', [""]);
          }}
        >
          GSTR4
        </button>
      </div>
    </BlockUI>
  </div>
);

Dashboard.propTypes = {
  loading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  createOneFile: PropTypes.func,
};

Dashboard.defaultProps = {
  loading: false,
  loadingMessage: '',
  createOneFile: noop,
};

export default Dashboard;