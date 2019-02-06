import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Spinner from "../Spinner";
import styles from "./styles";

/**
 * Assign the project to an employee.
 * @param {Object} props - component props
 * @param {string} props.uri - input element value
 * @param {object} props.classes - object classes injected by withStyles
 * @param {boolean} props.isLoading- mark if the component is loading or not
 * @param {string[]} props.errors- array of errors to show up
 * @param {func} props.onChange- func triggered when the input is changing
 * @param {func} props.onSubmit- func triggered when the form is going to be submitted
 */

const ShortenerForm = (props) => {
  const { uri, errors, classes, isLoading, onSubmit, onChange } = props;
  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <div>
        <TextField
          id="shortener"
          label="Type a url..."
          value={uri}
          onChange={onChange}
          margin="normal"
          InputLabelProps={{
            classes: {
              root: classes.label,
              focused: classes.labelFocused
            }
          }}
          InputProps={{
            classes: {
              root: classes.root,
              underline: classes.underline
            }
          }}
        />
        {errors &&
          errors.map((err, i) => (
            <div className={classes.error} key={`err-${i}`}>
              {err}
            </div>
          ))}
      </div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={onSubmit}
      >
        {isLoading ? <Spinner size="medium" /> : <span>Submit (┛❍ᴥ❍ )┛</span>}
      </Button>
    </form>
  );
};

export default withStyles(styles)(ShortenerForm);
