import React from 'react';
import PropTypes from 'prop-types';
import BlockUI from 'react-block-ui';

import GSTR1 from '../../assets/images/gstr1.png';
import GSTR4 from '../../assets/images/gstr4.png';
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
      <div className="gstrs">
        <div
          className="gstr-container gstr1-container"
          role="presentation"
          onClick={() => {
            createOneFile('GSTR1', []);
          }}
          onKeyDown={noop}
        >
          <img src={GSTR1} alt="" />
        </div>
        <div
          className="gstr-container gstr4-container"
          role="presentation"
          onClick={() => {
            createOneFile('GSTR4', [""]);
          }}
          onKeyDown={noop}
        >
          <img src={GSTR4} alt="" />
        </div>
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