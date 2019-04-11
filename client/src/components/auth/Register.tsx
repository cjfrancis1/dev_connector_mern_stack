import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import IClientRegister from "../../interfaces/ClientRegister.interface";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import IClientAuthState from "../../interfaces/ClientAuthState.interface";
import IClientErrors from "../../interfaces/ClientErrors.interface";
import TextFieldGroup from "../common/TextFieldGroup";

interface IProps extends RouteComponentProps {
  auth: IClientAuthState;
  errors: IClientErrors;
  registerUser: Function;
}

interface IState extends IClientRegister {
  errors?: IClientErrors;
}

class Register extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { name, email, password, password2 } = this.state;
    const newUser = { name, email, password, password2 };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors && errors.name}
                />
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
                  info="This site uses Gravatar so if you want a profile image, use
                  a Gravatar email"
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors && errors.password2}
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
  { registerUser }
)(withRouter(Register));
