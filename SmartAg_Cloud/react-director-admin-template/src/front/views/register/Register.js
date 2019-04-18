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
import { AsideRight } from '../../components';

// #endregion

// #region flow types
type Props = {
  // react-router 4:
  match: any,
  location: any,
  history: any,

  // views props:
  currentView: string,
  enterRegister: () => void,
  leaveRegister: () => void,

  // userAuth:
  isAuthenticated: boolean,
  isFetching: boolean,
  isLogging: boolean,
  disconnectUser: () => any,
  logUserIfNeeded: () => any,
};

type State = {
  name: string,
  email: string,
  password: string,
  confirm_password: string,
  role: string,
};
// #endregion

class Register extends PureComponent<Props, State> {
  // #region propTypes
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    // views props:
    currentView: PropTypes.string.isRequired,
    enterRegister: PropTypes.func.isRequired,
    leaveRegister: PropTypes.func.isRequired,

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
    name: '',
    email: '',
    password: '',
    confirm_password:'',
    role:'',
    isLoading: true,
    token: '',
    signUpError: '',
    signInError: '',
  };

  // #region lifecycle methods
  componentDidMount() {
    const { enterRegister, disconnectUser } = this.props;

    disconnectUser(); // diconnect user: remove token and user info
   // enterRegister();
  }

  componentWillUnmount() {
    const { leaveRegister } = this.props;
    //leaveRegister();
  }

  render() {
    const { name, email, password, confirm_password } = this.state;

    const { isLogging } = this.props;

    return (
      <div className="content register_content">
        <Row>
          <Col md={4} mdOffset={4} xs={10} xsOffset={10}>
            <form className="form-horizontal">
              <fieldset>
                <legend className="text-center">
                  <h1>
                    <i className="fa fa-3x fa-user-circle" aria-hidden="true" />
                  </h1>
                  <h2>Register</h2>
                </legend>
                <div className="form-group input_fields">
                  <label
                    htmlFor="name"
                    className="col-lg-2 control-label"
                  >
                    Name
                  </label>
                  <div className="col-lg-10">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                      value={name}
                      onChange={this.handlesOnNameChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="inputEmail"
                    className="col-lg-2 control-label"
                  >
                    Email
                  </label>
                  <div className="col-lg-10">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Email"
                      value={email}
                      onChange={this.handlesOnEmailChange}
                      required
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
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="confirmPassword"
                    className="col-lg-2 control-label"
                  >
                    Confirm Password
                  </label>
                  <div className="col-lg-10">
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Password"
                      value={confirm_password}
                      onChange={this.handlesOnConfirmPasswordChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="role"
                    className="col-lg-2 control-label"
                  >
                    Role
                  </label>
                  <div className="col-lg-10">
                  <div className="radio">
                    <input
                      type="radio"
                      className="form-control"
                      id="admin"
                      placeholder="Admin"
                      value="admin"
                      name="role"
                      onChange={this.handlesOnRoleChange}
                    />
                    <label class="radio_role">Admin</label>
                    <br/>
                    <input
                      type="radio"
                      className="form-control"
                      id="user"
                      placeholder="User"
                      value="user"
                      name="role"
                      onChange={this.handlesOnRoleChange}
                    /><label class="radio_role">User</label>
                    <br/>
                    </div>
                  </div>
                </div>

                <div className="form-group register_button">
                  <Col lg={10} lgOffset={2}>
                    <Button
                      className="login-button btn-block"
                      bsStyle="primary"
                      disabled={isLogging}
                      onClick={this.handlesOnRegister}
                    >
                      {isLogging ? (
                        <span>
                          Registering ... &nbsp;
                          <i className="fa fa-spinner fa-pulse fa-fw" />
                        </span>
                      ) : (
                        <span>Register</span>
                      )}
                    </Button>
                  </Col>
                </div>
              </fieldset>
            </form>
          </Col>
        </Row>
        <Row>
        <p class="login_href">Already registered? <a href="/login">Login</a></p>
        </Row>
      </div>
    );
  }
  // #endregion

  // #region form inputs change callbacks
  handlesOnNameChange = (event: SyntheticEvent<>) => {
    if (event) {
      //event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ name: event.target.value.trim() });
    }
  };

  handlesOnEmailChange = (event: SyntheticEvent<>) => {
    if (event) {
      //event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ email: event.target.value.trim() });
    }
  };

  handlesOnPasswordChange = (event: SyntheticEvent<>) => {
    if (event) {
      //event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ password: event.target.value.trim() });
    }
  };

  handlesOnConfirmPasswordChange = (event: SyntheticEvent<>) => {
    if (event) {
      //event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ confirm_password: event.target.value.trim() });
    }
  };

  handlesOnRoleChange = (event: SyntheticEvent<>) => {
    if (event) {
      //event.preventDefault();
      console.log("ROle: " + event.target.value.trim());
      // should add some validator before setState in real use cases
      this.setState({ role: event.target.value.trim() });
    }
  };
  // #endregion

  // #region on login button click callback
  handlesOnRegister = (event: SyntheticEvent<>) =>{
    const {
      name,
      email,
      password,
      confirm_password,
      role,
    } = this.state;
    const { history } = this.props;
    // Post request to backend
    fetch('http://localhost:3002/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        confirm_password: confirm_password,
        role: role,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          history.push({ pathname: '/login' });
          setInStorage('my_key', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            password: '',
            email: '',
            name: '',
            confirm_password: '',
            role: '',
            token: json.token,
          });
          
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

export default Register;
