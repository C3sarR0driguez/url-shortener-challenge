import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "../../components/Typography";
import styles from "./styles";

const NotFound = props => {
  const { classes } = props;
  return (
    <section className={classes.root}>
        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            <div className={classes.content}>
              <Typography variant="h1" className="animated slideInDown">404</Typography>
              <Typography variant="p">
                Sorry we couldn't find what you were searching for...
              </Typography>
            </div>
          </Grid>
        </Grid>
    </section>
  );
};

export default withStyles(styles)(NotFound);
