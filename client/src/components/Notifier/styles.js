import { createStyles } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";

const styles = ({ spacing }) =>
  createStyles({
    root: {
      display: "none",
      position: "fixed",
      zIndex: 2,
      right: 5,
      top: 5,
      color: "#fff",
      padding: spacing.unit * 3,
      boxShadow: "6px 3px 25px -6px rgba(0,0,0,0.75)",
      backgroundColor: cyan[800],
      maxWidth: 300
    },
    show: {
      display: "block"
    },
    hide: {
      display: "block",
      animationFillMode: "forwards"
    }
  });
export default styles;
