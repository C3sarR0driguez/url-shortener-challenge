import React from "react";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import styles from "./styles";

/**
 * Assign the project to an employee.
 * @param {Object} props - component props
 * @param {object} props.classes - object classes injected by withStyles
 */

const Spinner = props => (
  <Icon
    className={classNames(
      props.classes[props.size],
      props.classes.root,
      props.className,
      "fas fa-spinner animated infinite rotateIn"
    )}
  />
);

export default withStyles(styles)(Spinner);
