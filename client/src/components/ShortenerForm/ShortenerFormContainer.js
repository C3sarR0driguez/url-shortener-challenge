import React, { Component } from "react";
import urlRegex from "url-regex";
import ShortenerForm from "./ShortenerForm";

/**
 * Enum for tri-state values.
 * @readonly
 * @enum {string}
 */
const ERRORS = {
  URL_NOT_VALID: "Typed url is not valid",
  EMPTY: "Please type a url first"
};

/**
 * Assign the project to an employee.
 * @param {Object} props - component props
 * @param {boolean} props.isLoading - marker for the component to indicate if is loading or not
 * @param {func} props.onHandleSubmitValid - event handler to trigger when uri is valid ands the submit button was clicked
 */

class ShortenerFormContainer extends Component {
  static defaultProps = {
    onHandleSubmitValid: _ => {},
    isLoading: false
  };

  state = {
    uri: "",
    errors: []
  };

  testIfValid = uri => {
    if (!uri) {
      return [ERRORS.EMPTY];
    }
    if (!urlRegex().test(uri)) {
      return [ERRORS.URL_NOT_VALID];
    }
    return null;
  };

  handleChange = e => {
    this.setState({ uri: e.target.value });
  };

  /** Delete the state only when the url is valid */
  handleSubmit = e => {
    const { uri } = this.state;
    const { onHandleSubmitValid } = this.props;
    const errors = this.testIfValid(uri);
    if (errors) {
      this.setState({ errors });
    } else {
      this.setState({ errors: [], uri: "" });
      onHandleSubmitValid(uri);
    }
  };

  render() {
    const { uri, errors } = this.state;
    const { isLoading } = this.props;
    return (
      <ShortenerForm
        {...{
          uri,
          isLoading,
          errors,
          onSubmit: this.handleSubmit,
          onChange: this.handleChange
        }}
      />
    );
  }
}

export default ShortenerFormContainer;
