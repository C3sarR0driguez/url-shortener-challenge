import { createStyles } from "@material-ui/core";
import cyan from "@material-ui/core/colors/cyan";

const styles = ({spacing}) => createStyles({
    root: {
      height: "100%",
      width: "100%"
    },
    content: {
      textAlign: "center",
      paddingTop: 200
    },
    btnWrapper: {
      position: "fixed",
      left: 10,
      top: 10
    },
    btn: {
        color: "#fff",
        backgroundColor: cyan[800],
        padding: spacing.unit * 2
    }
  });

  export default styles;