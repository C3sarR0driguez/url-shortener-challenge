import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "../../components/Typography";
import { connect } from "react-redux";
import ShortenerForm from "../../components/ShortenerForm";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Spinner from "../../components/Spinner";
import { getUrls, postUrl, deleteUrl } from "../../actions";
import { Link } from "react-router-dom";
import styles from "./styles";

class Home extends Component {
  componentDidMount() {
    this.props.getUrls();
  }

  handleSubmit = uri => {
    this.props.postUrl(uri);
  };

  handleDelete = (id, hash, removeToken) => {
    this.props.deleteUrl(id, hash, removeToken);
  };

  get grid() {
    const { classes, urls, isDeletingRecord } = this.props;
    return (
      <div className={classes.grid}>
        {(urls.length || null) &&
          [
            <div className={classes.container} key="grid-header">
              <div className={classes.flex}>Url</div>
              <div className={classes.flex}>Remove</div>
              <div className={classes.flex}>Visits</div>
            </div>
          ].concat(
            urls.map((url, i) => {
              const jsxRow = (
                <div className={classes.container} key={`grid-row-${url._id}`}>
                  <div className={classes.flex}>
                    <Link to={`/hash/${url.hash}`}>{url.url}</Link>
                  </div>
                  <div className={classes.flex}>
                    <Hidden mdUp>
                      <span>Remove at -> </span>
                    </Hidden>
                    {isDeletingRecord === url._id ? (
                      <Spinner size="medium" />
                    ) : (
                      <Button
                        className={classes.deleteBtn}
                        onClick={() =>
                          this.handleDelete(url._id, url.hash, url.removeToken)
                        }
                      >
                        {url.removeToken}
                      </Button>
                    )}
                  </div>
                  <div className={classes.flex}>
                    {" "}
                    <Hidden mdUp>
                      <span>Visits -> </span>
                    </Hidden>
                    {url.visits}
                  </div>
                </div>
              );
              return jsxRow;
            })
          )}
      </div>
    );
  }

  render() {
    const { classes, isPosting, isFetching, fetchOk } = this.props;
    return (
      <section className={classes.root}>
        <Grid container justify="center">
          <Grid item xs={10} md={10} lg={8}>
            <div className={classes.content}>
              <Typography variant="h1" className="animated zoomIn">
                Welcome!!!
              </Typography>
              <Typography variant="p">
                Use the new shortener app ヽ(^◇^*)/
              </Typography>
              <Typography variant="body2">greatness awaits!!</Typography>
              <ShortenerForm
                onHandleSubmitValid={this.handleSubmit}
                isPosting={isPosting}
              />
              {isFetching && (
                <div className={classes.spinnerWrapper}>
                  <Spinner size="big" />
                </div>
              )}
              {fetchOk && this.grid}
            </div>
          </Grid>
        </Grid>
      </section>
    );
  }
}

function mapStateToProps({ url }) {
  return {
    ...url
  };
}

export default connect(
  mapStateToProps,
  { getUrls, postUrl, deleteUrl }
)(withStyles(styles)(Home));
