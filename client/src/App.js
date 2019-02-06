import React, { Component } from "react";
import Layout from "./components/Layout";
import NotFound from "./screens/NotFound";
import Home from "./screens/Home";
import Hash from "./screens/Hash";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import store from "./store";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Layout>
            <Router>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/hash/:hash"  component={Hash} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </Layout>
        </MuiThemeProvider>
      </Provider>
    );
  }
}



export default App;
