import React, { Component } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import * as styles from "../../css/App.css";
import { connect } from "react-redux";
import IClientAuthState from "../../interfaces/ClientAuthState.interface";

interface IProps extends RouteComponentProps {
  auth: IClientAuthState;
}

class Landing extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className={styles.landing}>
        <div
          className={
            styles.darkOverlay + " " + styles.landingInner + " text-light"
          }
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer Connector</h1>
                <p className="lead">
                  {" "}
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: { auth: IClientAuthState }) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
