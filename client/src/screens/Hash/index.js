import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import lime from "@material-ui/core/colors/lime";
import amber from "@material-ui/core/colors/amber";
import purple from "@material-ui/core/colors/purple";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "../../components/Typography";
import { connect } from "react-redux";
import { getUrlFromHash } from "../../actions";
import Spinner from "../../components/Spinner";
import styles from "./styles";

class Hash extends Component {
  static colors = [blue[500], purple[500], lime[500], amber[500], pink[500]];

  static generateBackgroundColor = () => {
    const len = Hash.colors.length - 1;
    return Hash.colors[Math.round(Math.random() * len)];
  };

  state = {
    bgColor: ""
  };

  componentDidMount() {
    const { match } = this.props;
    const { hash } = match.params;
    this.setState({ bgColor: Hash.generateBackgroundColor() });
    this.props.getUrlFromHash(hash);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isFetching &&
      (!this.isFetching && this.props.fetchError && this.props.notFound)
    ) {
      this.props.history.replace("/not-found");
    }
  }

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { classes, match, url, isFetching, fetchOk } = this.props;
    const { bgColor } = this.state;
    const { hash } = match.params;
    return (
      <section className={classes.root} style={{ backgroundColor: bgColor }}>
        <div className={classes.btnWrapper}>
          <Button className={classes.btn} onClick={this.handleBack}>Back</Button>
        </div>
        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            <div className={classes.content}>
              <Typography
                variant="h1"
                gutterBottom
                className="animated lightSpeedIn"
              >
                {hash}
              </Typography>
              {isFetching && <Spinner size="jumbo" />}
              {fetchOk && (
                <Fragment>
                  <Typography variant="p" gutterBottom>
                    {url && url.url}
                  </Typography>
                  <Typography variant="p">
                    Visits {url && url.visits}
                  </Typography>
                </Fragment>
              )}
            </div>
          </Grid>
        </Grid>
      </section>
    );
  }
}

function mapStateToProps({ hash }) {
  return {
    ...hash
  };
}

export default connect(
  mapStateToProps,
  { getUrlFromHash }
)(withStyles(styles)(Hash));
