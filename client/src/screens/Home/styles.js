import { createStyles } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";
import pink from "@material-ui/core/colors/pink";

const styles = ({ spacing, breakpoints }) =>
  createStyles({
    root: {
      backgroundColor: cyan[500],
      height: "100%",
      width: "100%"
    },
    content: {
      textAlign: "center"
    },
    container: {
      "&:first-child": {
        display: "none"
      },
      "&:nth-child(even)": {
        backgroundColor: cyan[400]
      },
      fontFamily: "Roboto",
      fontStyle: "italic",
      display: "block",
      color: "#fff",
      backgroundColor: pink.A200,
      padding: spacing.unit * 2,
      marginTop: spacing.unit * 2,
      [breakpoints.up("md")]: {
        "&:first-child": {
          display: "flex"
        },
        backgroundColor: "transparent",
        "&:nth-child(even)": {
          backgroundColor: "transparent"
        },
        display: "flex",
        padding: spacing.unit
      }
    },
    deleteBtn: {
      color: "#fff"
    },
    flex: {
      flex: 1,
      textAlign: "center",
      maxWidth: "100%",
      padding: spacing.unit
    },
    spinnerWrapper: {
      marginTop: spacing.unit * 9
    },
    grid: {
      marginTop: spacing.unit * 5,
      maxHeight: 450,
      overflowY: "auto"
    }
  });

  export default styles;