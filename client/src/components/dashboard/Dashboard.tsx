import React, { Component, MouseEvent } from "react";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import IClientProfileState from "../../interfaces/ClientProfileState.interface";

import { RouteComponentProps } from "react-router-dom";
import IClientAuthState from "../../interfaces/ClientAuthState.interface";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import { isEmpty } from "../../validation/is-empty";
import Education from "./Education";

interface IProps extends RouteComponentProps {
  profile: IClientProfileState;
  getCurrentProfile: Function;
  deleteAccount: Function;
  auth: IClientAuthState;
}

class Dashboard extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e: MouseEvent<HTMLButtonElement>) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (!profile || loading) {
      dashboardContent = <Spinner />;
    } else if (isEmpty(profile)) {
      // User is logged in but has no profile
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    } else {
      // Make sure profile and experience aren't undefined
      profile.experience = profile.experience ? profile.experience : [];
      profile.education = profile.education ? profile.education : [];

      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            {!isEmpty(profile.experience) && (
              <Experience experience={profile.experience} />
            )}
            {!isEmpty(profile.education) && (
              <Education education={profile.education} />
            )}
            <div style={{ marginBottom: "60px" }} />
            <button onClick={this.onDeleteClick} className="btn btn-danger">
              Delete My Account
            </button>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IProps) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
