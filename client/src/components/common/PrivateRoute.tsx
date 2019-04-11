import React from "react";
import { connect } from "react-redux";
import IClientAuthState from "../../interfaces/ClientAuthState.interface";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface IProps extends RouteProps {
  // TODO: Update component type to be the correct type.
  component: any; //tslint:disable-line
  auth: IClientAuthState;
}

const PrivateRoute = ({ component: Component, auth, ...rest }: IProps) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = (state: { auth: IClientAuthState }) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
