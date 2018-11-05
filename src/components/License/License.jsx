import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';
import { FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';

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
      <Input {...(touched ? { valid: !error } : {})} {...input} {...custom} />
      {touched && error && <FormFeedback>{error}</FormFeedback>}
  </Fragment>
);

const License = ({ handleSubmit, onSubmit }) => (
  <Form onSubmit={handleSubmit(onSubmit)}>
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
      <Field name="key" type="text" component={renderTextField} normalize={normalizeKey} />
    </FormGroup>
    <Button className="btn btn-primary" type="submit">Register License</Button>
  </Form>
);

License.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
};

License.defaultProps = {
  onSubmit: noop,
};

export default reduxForm({ form: 'licenseForm' })(License);
