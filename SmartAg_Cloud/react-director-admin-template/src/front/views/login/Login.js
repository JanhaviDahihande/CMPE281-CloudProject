// @flow

// #region imports
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import auth from '../../services/auth';
import '../../style/login.css';
import {
  getFromStorage,
  setInStorage,
} from '../storage';
// #endregion

// #region flow types
type Props = {
  // react-router 4:
  match: any,
  location: any,
  history: any,

  // views props:
  currentView: string,
  enterLogin: () => void,
  leaveLogin: () => void,

  // userAuth:
  isAuthenticated: boolean,
  isFetching: boolean,
  isLogging: boolean,
  disconnectUser: () => any,
  logUserIfNeeded: () => any,
};

type State = {
  email: string,
  password: string,
};
// #endregion

class Login extends PureComponent<Props, State> {
  // #region propTypes
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    // views props:
    currentView: PropTypes.string.isRequired,
    enterLogin: PropTypes.func.isRequired,
    leaveLogin: PropTypes.func.isRequired,

    // userAuth:
    isAuthenticated: PropTypes.bool,
    isFetching: PropTypes.bool,
    isLogging: PropTypes.bool,
    disconnectUser: PropTypes.func.isRequired,
    logUserIfNeeded: PropTypes.func.isRequired,
  };
  // #endregion

  static defaultProps = {
    isFetching: false,
    isLogging: false,
  };

  state = {
    email: '',
    password: '',
  };

  // #region lifecycle methods
  componentDidMount() {
    const { enterLogin, disconnectUser } = this.props;

    disconnectUser(); // diconnect user: remove token and user info
    enterLogin();
  }

  componentWillUnmount() {
    const { leaveLogin } = this.props;
    leaveLogin();
  }

  render() {
    const { email, password } = this.state;

    const { isLogging } = this.props;

    return (
      <div className="content login_content">
        <Row>
          <Col md={4} mdOffset={5} xs={5} xsOffset={1}>
            <form className="form-horizontal">
              <fieldset>
                <legend className="text-center">
                  <h1>
                    <i className="fa fa-3x fa-user-circle" aria-hidden="true" />
                  </h1>
                  <h2>Login</h2>
                </legend>

                <div className="form-group input_fields">
                  <label
                    htmlFor="inputEmail"
                    className="col-lg-2 control-label"
                  >
                    Email
                  </label>
                  <div className="col-lg-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Email"
                      value={email}
                      onChange={this.handlesOnEmailChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="inputPassword"
                    className="col-lg-2 control-label"
                  >
                    Password
                  </label>
                  <div className="col-lg-10">
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                      placeholder="Password"
                      value={password}
                      onChange={this.handlesOnPasswordChange}
                    />
                  </div>
                </div>
                <div className="form-group login_button">
                  <Col lg={10} lgOffset={10}>
                    <Button
                      className="login-button btn-block"
                      bsStyle="primary"
                      disabled={isLogging}
                      onClick={this.handlesOnLogin}
                    >
                      {isLogging ? (
                        <span>
                          login in... &nbsp;
                          <i className="fa fa-spinner fa-pulse fa-fw" />
                        </span>
                      ) : (
                        <span>Login</span>
                      )}
                    </Button>
                  </Col>
                </div>
              </fieldset>
            </form>
          </Col>
        </Row>
        <Row >
          <p class="register_href">Not an existing user? <a href="/register">Register</a></p>
        </Row>
      </div>
    );
  }
  // #endregion

  // #region form inputs change callbacks
  handlesOnEmailChange = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ email: event.target.value.trim() });
    }
  };

  handlesOnPasswordChange = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ password: event.target.value.trim() });
    }
  };
  // #endregion

  // #region on login button click callback
  handlesOnLogin = (event: SyntheticEvent<>) =>{
    const {
      email,
      password,
    } = this.state;
    const { history } = this.props;
    // Post request to backend
    fetch('http://localhost:3002/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        console.log("json role: " + json["role"]);
        if (json.success) {
          setInStorage('my_key', { token: json.token });
         
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
          if(json["role"] == "admin"){
            console.log("admin");
            history.push({ pathname: '/' });
          }
            
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
        
      });
  };
  // #endregion

  // #region on go back home button click callback
  goHome = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
    }

    const { history } = this.props;

    history.push({ pathname: '/' });
  };
  // #endregion
}

export default Login;
