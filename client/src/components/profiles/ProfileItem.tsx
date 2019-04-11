import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "../../validation/is-empty";
import IClientProfile from "../../interfaces/ClientProfile.interface";

interface IProfileItemProps {
  profile: IClientProfile;
}

class ProfileItem extends Component<IProfileItemProps> {
  render() {
    const { profile } = this.props;

    if (profile.user && typeof profile.user != "string") {
      return (
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <img
                src={profile.user.avatar}
                alt=""
                className="rounded-circle"
              />
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{profile.user.name}</h3>
              <p>
                {profile.status}{" "}
                {isEmpty(profile.company) ? (
                  undefined
                ) : (
                  <span>at {profile.company}</span>
                )}
              </p>
              <p>
                {isEmpty(profile.location) ? (
                  undefined
                ) : (
                  <span>{profile.location}</span>
                )}
              </p>
              <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                View Profile
              </Link>
            </div>
            <div className="col-md-4 d-none d-md-block">
              <h4>Skill Set</h4>
              <ul className="list-group">
                {profile.skills &&
                  typeof profile.skills !== "string" &&
                  profile.skills.slice(0, 4).map((skill, index) => (
                    <li key={index} className="list-group-item">
                      <i className="fa fa-check pr-1" />
                      {skill}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return undefined;
  }
}

export default ProfileItem;
