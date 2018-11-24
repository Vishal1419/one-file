import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isElectron from 'is-electron';

import Dashboard from './Dashboard';
import * as Toast from '../Toaster/Toaster';
import { actions } from '../../redux/dashboard';
import { noop } from '../../utils';
import RequestStates from '../../constants/request-states';

let ipcRenderer;
if (isElectron()) {
	ipcRenderer = window.require('electron').ipcRenderer;	
}

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.createOneFile = this.createOneFile.bind(this);
  }

  componentDidMount() {
    if (isElectron()) {
      ipcRenderer.on('create-one-file-loading-message', (event, message) => {
        this.props.setLoadingMessage(message);
      });
      ipcRenderer.on('create-one-file-error', (event, message, alternateMessage) => {
        Toast.error(`${message}\n${alternateMessage}`, 'Error');
        this.props.oneFileCreationCompleted();
      });
      ipcRenderer.on('create-one-file-success', (event, message, filePath) => {
        Toast.success(message, 'Success', () => {
          ipcRenderer.send('open-explorer-window', filePath);
        });
        this.props.oneFileCreationCompleted();
      });
      ipcRenderer.on('create-one-file-cancelled', () => {
        this.props.oneFileCreationCompleted();
      });
    }
  }

  createOneFile(fileName, additionalColumns, startingRowNo = 5) {
    if (isElectron()) {
      ipcRenderer.send('create-one-file', fileName, additionalColumns, startingRowNo);
      this.props.oneFileCreationStarted();
    }
  }

  render() {
    const { loading, loadingMessage } = this.props;
    return (
      <Dashboard
        loading={loading}
        loadingMessage={loadingMessage}
        createOneFile={this.createOneFile}
      />
    );
  }
}

DashboardContainer.propTypes = {
  loading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  setLoadingMessage: PropTypes.func,
  oneFileCreationStarted: PropTypes.func,
  oneFileCreationCompleted: PropTypes.func,
};

DashboardContainer.defaultProps = {
  loading: false,
  loadingMessage: '',
  setLoadingMessage: noop,
  oneFileCreationStarted: noop,
  oneFileCreationCompleted: noop,
};

const mapStateToProps = state => ({
  loading: state.dashboard.requestState === RequestStates.loading,
  loadingMessage: state.dashboard.loadingMessage,
});

const mapDispatchToProps = dispatch => ({
  setLoadingMessage: message => dispatch(actions.setLoadingMessage(message)),
  oneFileCreationStarted: () => dispatch(actions.oneFileCreationStarted()),
  oneFileCreationCompleted: () => dispatch(actions.oneFileCreationCompleted()), 
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);