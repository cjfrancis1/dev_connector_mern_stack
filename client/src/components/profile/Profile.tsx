import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGitHub from "./ProfileGithub";
import { getProfileByHandle } from "../../actions/profileActions";
import IClientProfileState from "../../interfaces/ClientProfileState.interface";
import {
  IClientEducationItem,
  IClientExperienceItem
} from "../../interfaces/ClientProfile.interface";

interface IProfileProps extends RouteComponentProps {
  profile: IClientProfileState;
  getProfileByHandle: Function;
}

class Profile extends Component<IProfileProps> {
  componentDidMount() {
    const { handle } = this.props.match.params as { handle: string };
    if (handle) {
      this.props.getProfileByHandle(handle);
    }
  }

  componentWillReceiveProps(nextProps: IProfileProps) {
    if (nextProps.profile.profile === undefined && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === undefined || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education as IClientEducationItem[]}
            experience={profile.experience as IClientExperienceItem[]}
          />
          {profile.githubusername ? (
            <ProfileGitHub username={profile.githubusername} />
          ) : (
            undefined
          )}
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: { profile: IClientProfileState }) => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
