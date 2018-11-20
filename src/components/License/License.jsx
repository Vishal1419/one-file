import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import BlockUI from 'react-block-ui';

import { noop } from '../../utils';

const chunk = (str, n) => {
  const ret = [];
  let i;
  let len;

  for(i = 0, len = str.length; i < len; i += n) {
     ret.push(str.substr(i, n));
  }

  return ret;
};

const normalizeKey = value => {
  if (!value) {
    return value;
  }
  let newValue = value.replace(new RegExp('-', 'g'), '');
  if (newValue.length <= 25) {
    return chunk(newValue, 5).join('-');
  } else {
    newValue = newValue.substring(0, 25);
    return chunk(newValue, 5).join('-');
  }
}

const renderTextField = ({ input, meta: { touched, error }, ...custom }) => (
  <Fragment>
      <Input {...(touched ? { valid: !error, invalid: !!error } : { })} {...input} {...custom} />
      {touched && error && <span className="error">{error}</span>}
  </Fragment>
);

const License = ({ handleSubmit, loading, onSubmit }) => (
  <BlockUI
    tag="div"
    blocking={loading}
    className="frm-license-container"
    loader={
      <div className="waiting-loader">
        <i className="fas fa-spinner fa-pulse" />
      </div>
    }
  >
    <Form className="frm-license" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Field name="name" type="text" component={renderTextField} />
      </FormGroup>
      <FormGroup>
        <Label for="mobile">Mobile</Label>
        <Field name="mobile" type="text" component={renderTextField} />
      </FormGroup>
      <FormGroup>
        <Label for="key">Key</Label>
        <Field name="key" className="key" type="text" component={renderTextField} normalize={normalizeKey} />
      </FormGroup>
      <Button className="btn btn-success btn-register-license" type="submit">Register License</Button>
    </Form>
  </BlockUI>
);

License.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
};

License.defaultProps = {
  loading: false,
  onSubmit: noop,
};

export default reduxForm({ form: 'licenseForm' })(License);
