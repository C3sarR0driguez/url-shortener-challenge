import React, { Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Helmet from "react-helmet";
import Notifier from "../Notifier";
import { connect } from "react-redux";

/**
 * Assign the project to an employee.
 * @param {Object} props - component props
 * @param {JSX.Element} props.children - jsx children
 */

const Layout = (props) => (
  <Fragment>
    <Notifier message={props.message} showUp={props.show}/>
    <CssBaseline />
    <Helmet>
      <meta charSet="utf-8" />
      <title>Shortener</title>
      {/* <link rel="canonical" href="http://mysite.com/example" /> */}
    </Helmet>
    {props.children}
  </Fragment>
);

function mapStateToProps({ui}) {
  return {
    ...ui
  }
}

export default connect(mapStateToProps,null)(Layout);
