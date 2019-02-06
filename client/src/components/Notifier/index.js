import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import styles from "./styles";

/**
 * Assign the project to an employee.
 * @param {Object} props - component props
 * @param {object} props.classes - object classes injected by withStyles
 * @param {object} props.showUp - flag to indicate if notifier should be showed up
 * @param {object} props.message - message to display
 */

const Notifier = props => (
  <div
    className={(classNames(props.classes.root,"animated",{
        "bounceInRight": props.showUp,
        "bounceOutRight": props.showUp === false,
        [props.classes.show]: props.showUp,
        [props.classes.hide]: props.showUp === false,
    }))}
  >
    {props.message}
  </div>
);

export default withStyles(styles)(Notifier);
