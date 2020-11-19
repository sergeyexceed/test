import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as authActions from "../../store/actions/authorize";
import Alert from "@material-ui/lab/Alert";
import { createLink } from "../../utils/links";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  static propTypes = {
    auth: PropTypes.object,
    authActions: PropTypes.object,
  };

  static defaultProps = {
    auth: {},
    authActions: {},
  };
  render() {
    const { username, password } = this.state;
    const { auth } = this.props;

    if (auth.token) {
      return <Redirect to={createLink("home")} />;
    }

    const handleLogin = () => {
      this.props.authActions.login(username, password);
    };

    const handleChangeLogin = ({ value }) => {
      this.setState({ username: value });
    };

    const handleChangePassword = ({ value }) => {
      this.setState({ password: value });
    };

    return (
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Typography
            component="div"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#cfe8fc",
              height: "100vh",
              padding: "30px",
            }}
          >
            <TextField
              value={username}
              onChange={({ target }) => handleChangeLogin(target)}
              style={{ width: "450px", margin: "20px 0" }}
              label="Username"
              variant="outlined"
            />
            <TextField
              value={password}
              onChange={({ target }) => handleChangePassword(target)}
              style={{ width: "450px", margin: "20px 0" }}
              label="Password"
              type="password"
              variant="outlined"
            />

            <Button
              disabled={!username || !password}
              style={{ width: "120px", marginBottom: "20px" }}
              variant="contained"
              color="primary"
              onClick={() => handleLogin()}
            >
              Login
            </Button>
            {auth.error && <Alert severity="error">{auth.error}</Alert>}
          </Typography>
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
  })
)(Login);
