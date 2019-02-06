import React from "react";
import MuiTypography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import styles from "./styles";

/**
 * Assign the project to an employee.
 * @param {Object} props - component props
 * @param {object} props.classes - object classes injected by withStyles
 * @param {JSX.Element} props.children - children elements
 * @param {variant} props.variant - variant to choose styles
 */

  export const Typography = props => {
    const {
      className,
      classes,
      variant,
      children,
      ...left
    } = props;
  
    return (
      <MuiTypography
        className={classNames(classes[variant] || classes.default, props.className)}
        {...left}
      >
        {children}
      </MuiTypography>
    );
  };

export default withStyles(styles)(Typography);
