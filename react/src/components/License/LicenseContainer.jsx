import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import isElectron from 'is-electron';
import MD5 from 'md5';

import License from './License';
import { actions } from '../../redux/license';
import * as Toast from '../Toaster/Toaster';
import RequestStates from '../../constants/request-states';
import { noop, crypto } from '../../utils';

let ipcRenderer;
if (isElectron()) {
	ipcRenderer = window.require('electron').ipcRenderer;	
}

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Name is required';
  }

  if (!values.mobile) {
    errors.mobile = 'Mobile number is required';
  } else if(!values.mobile.match(/^[0-9]*$/g)) {
    errors.mobile = 'Mobile should be a number';
  } else if (values.mobile.length < 10) {
    errors.mobile = 'Incorrect mobile number';
  }

  if (!values.key) {
    errors.key = 'Key is required';
  } else if (values.key.length < 25) {
    errors.key = 'Invalid Key';
  }

  return errors;
}

class LicenseContainer extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (isElectron()) {
      ipcRenderer.on('get-mac-address-error', (event, message) => {
        Toast.error(message, 'Error');
      });
      ipcRenderer.on('got-mac-address', (event, macAddress) => {
        const mac = macAddress.replace(/-/g, '');
        if (macAddress) {
          const { name, mobile, key } = this.props.license;
          const capitalKey = key.toUpperCase();
          this.props.addLicense(name, mobile, capitalKey, mac).then(() => {
            if (this.props.isError) return;
            const license = capitalKey + mac;
            const encryptedLicense = license.split('').map(char => MD5(crypto[crypto[crypto[char]]])).join('');
            console.log(encryptedLicense);
            ipcRenderer.send('save-license-file', { key: capitalKey, license: encryptedLicense });
          });
        }
      });
      ipcRenderer.on('save-license-file-error', (event, message) => {
        Toast.error(message, 'Error');
      });
      ipcRenderer.on('license-file-saved', () => {
        Toast.success(`Licensed application to ${this.props.license.name} successfully`, 'Success');
        this.props.flushLicense();
        this.props.history.push('/')
      });
    }
  }

  onSubmit(values) {
    this.props.saveLicense(values.name, values.mobile, values.key.replace(/-/g, ''));
    ipcRenderer.send('get-mac-address');    
  }

  render() {
    const { loading } = this.props;
    return (
      <License loading={loading} validate={validate} onSubmit={this.onSubmit} />
    );
  }
}

LicenseContainer.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  loading: PropTypes.bool,
  addLicense: PropTypes.func,
  saveLicense: PropTypes.func,
  flushLicense: PropTypes.func,
  license: PropTypes.objectOf(PropTypes.any),
};

LicenseContainer.defaultProps = {
  loading: false,
  addLicense: noop,
  saveLicense: noop,
  flushLicense: noop,
  license: {},
};

const mapStateToProps = state => ({
  loading: state.license.requestState === RequestStates.loading,
  isError: state.license.requestState === RequestStates.failure,
  license: state.license.license,
});

const mapDispatchToProps = dispatch => ({
  addLicense: (name, mobile, key, hdd) => dispatch(actions.addLicense(name, mobile, key, hdd)),
  saveLicense: (name, mobile, key) => dispatch(actions.saveLicense(name, mobile, key)),
  flushLicense: () => dispatch(actions.flushLicense()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LicenseContainer));
