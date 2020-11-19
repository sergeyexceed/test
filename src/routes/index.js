import React, { PureComponent } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import links from "../config/links";

import Login from "../components/Login";
import Projects from "../components/Projects";
import Structure from "../components/Structure";

class Routes extends PureComponent {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to={links.project} />
        <Route path={links.login} component={Login} />
        <Route path={links.project} component={Projects} />
        <Route path={links.structure} component={Structure} />
      </Switch>
    );
  }
}

export default withRouter(Routes);
