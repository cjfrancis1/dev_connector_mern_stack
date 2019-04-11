import React, { Component } from "react";
import IClientLogin from "../../interfaces/ClientLogin.interface";
import IClientErrors from "../../interfaces/ClientErrors.interface";
import IClientAuthState from "../../interfaces/ClientAuthState.interface";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { RouteComponentProps, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

interface IProps extends RouteComponentProps {
  auth: IClientAuthState;
  errors: IClientErrors;
  loginUser: Function;
}

interface IState extends IClientLogin {
  errors?: IClientErrors;
}

class Login extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = this.state;

    this.props.loginUser({ email, password });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors && errors.email}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors && errors.password}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: {
  auth: IClientAuthState;
  errors: IClientErrors;
}) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
