import red from "@material-ui/core/colors/red";
import { createStyles } from "@material-ui/core/styles";

const styles = ({ breakpoints }) =>
  createStyles({
    root: {
      color: "#fff",
      minWidth: 250,
      "&$underline:hover::before": {
        borderBottomColor: "#fff"
      },
      [breakpoints.up("sm")]: {
        minWidth: 320
      },
      [breakpoints.up("md")]: {
        minWidth: 400
      }
    },
    label: {
      color: "#fff",
      "&$labelFocused": {
        color: "#fff"
      }
    },
    labelFocused: {},
    underline: {
      "&::after": {
        borderBottomColor: "#fff"
      }
    },
    error: {
      fontSize: 12,
      color: red.A400
    }
  });

export default styles;
