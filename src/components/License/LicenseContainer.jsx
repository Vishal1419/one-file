import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import License from './License';
import RequestStates from '../../constants/request-states';

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

  onSubmit(values) {
    console.log(values, this);
  }

  render() {
    const { loading } = this.props;
    return (
      <License loading={loading} validate={validate} onSubmit={this.onSubmit} />
    );
  }
}

LicenseContainer.propTypes = {
  loading: PropTypes.bool,
};

LicenseContainer.defaultProps = {
  loading: false,
};

const mapStateToProps = state => ({
  loading: state.license.requestState === RequestStates.loading,
});

export default connect(mapStateToProps)(LicenseContainer);
