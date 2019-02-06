import { createStyles } from "@material-ui/core/styles";

const styles = ({ breakpoints }) =>
  createStyles({
    h1: {
      fontSize: 70,
      color: "#fff",
      fontFamily: "Caveat Brush",
      [breakpoints.up("sm")]: {
        fontSize: 85
      },
      [breakpoints.up("md")]: {
        fontSize: 95
      },
      [breakpoints.up("lg")]: {
        fontSize: 120
      }
    },
    h2: {},
    h3: {},
    p: {
      color: "#fff",
      fontSize: 16,
      fontFamily: "Baloo",
      [breakpoints.up("sm")]: {
        fontSize: 18
      },
      [breakpoints.up("lg")]: {
        fontSize: 20
      }
    },
    body2: {
      color: "#fff",
      fontSize: 14,
      fontFamily: "Roboto",
      [breakpoints.up("sm")]: {
        fontSize: 16
      }
    },
    default: {}
  });

  export default styles;
