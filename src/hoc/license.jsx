import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import BlockUI from 'react-block-ui';
import isElectron from 'is-electron';
import MD5 from 'md5';

import { crypto } from '../utils';

let ipcRenderer;
if (isElectron()) {
	ipcRenderer = window.require('electron').ipcRenderer;	
}

export default function (ComposedComponent) {
  class License extends Component {
    constructor() {
      super();
      this.state = {
        isLicensed: null,
      };
      this.handleUnLicensedState = this.handleUnLicensedState.bind(this);
    }

    componentDidMount() {
      console.log('component-mounted-at: ', Date.now());
      ipcRenderer.send('get-mac-key-hdd');
      ipcRenderer.on('get-mac-key-hdd-error', (event, message) => {
        this.handleUnLicensedState();
      });
      ipcRenderer.on('got-mac-key-hdd', (event, mac, key, license) => {
        console.log(mac, key, license);
        if (mac && key && license) {
          const macAddress = mac.replace(/-/g, '');
          console.log((key + macAddress));
          const expectedLicense = (key + macAddress).split('').map(char => MD5(crypto[crypto[crypto[char]]])).join('');
          if (expectedLicense === license) {
            this.setState({
              isLicensed: true,
            });
          } else {
            this.handleUnLicensedState();
          }
        } else {
          this.handleUnLicensedState();
        }
      });
    }

    handleUnLicensedState() {
      this.setState({
        isLicensed: false,
      });
      this.props.history.push('/license');
    }

    render() {
      return (
        <BlockUI
          tag="div"
          blocking={!this.state.isLicensed}
          loader = {
            <div className="waiting-loader full-screen">
              <i className="fas fa-spinner fa-pulse" />
            </div>    
          }
          renderChildren={false}
        >
          <ComposedComponent />
        </BlockUI>
      );
    }
  }

  License.propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  return withRouter(License);
}
