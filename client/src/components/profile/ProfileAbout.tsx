import React, { Component } from "react";
import { isEmpty } from "../../validation/is-empty";
import IClientProfile from "../../interfaces/ClientProfile.interface";
import IClientUser from "../../interfaces/ClientUser.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

class ProfileAbout extends Component<{ profile: IClientProfile }> {
  render() {
    const { profile } = this.props;
    profile.user = profile.user as IClientUser;
    profile.skills = profile.skills as string[];

    // Get first name
    const firstName = profile.user.name!.trim().split(" ")[0];

    // Skill List
    const skills = profile.skills.map((skill: string, index: number) => (
      <div key={index} className="p-3">
        <FontAwesomeIcon icon={faCheck} /> {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{firstName} does not have a bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
