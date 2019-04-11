import React, { Component } from "react";
import { isEmpty } from "../../validation/is-empty";
import IClientProfile from "../../interfaces/ClientProfile.interface";
import IClientUser from "../../interfaces/ClientUser.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faLinkedin,
  faYoutube,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

class ProfileHeader extends Component<{ profile: IClientProfile }> {
  render() {
    const { profile } = this.props;
    profile.user = profile.user as IClientUser;

    if (profile) {
      return (
        <div className="row">
          <div className="col-md-12">
            <div className="card card-body bg-info text-white mb-3">
              <div className="row">
                <div className="col-4 col-md-3 m-auto">
                  <img
                    className="rounded-circle"
                    src={profile.user.avatar}
                    alt=""
                  />
                </div>
              </div>
              <div className="text-center">
                <h1 className="display-4 text-center">{profile.user.name}</h1>
                <p className="lead text-center">
                  {profile.status}{" "}
                  {isEmpty(profile.company) ? (
                    undefined
                  ) : (
                    <span>at {profile.company}</span>
                  )}
                </p>
                {isEmpty(profile.location) ? (
                  undefined
                ) : (
                  <p>{profile.location}</p>
                )}
                <p>
                  {isEmpty(profile.website) ? (
                    undefined
                  ) : (
                    <a
                      className="text-white p-2"
                      href={profile.website}
                      target="_blank"
                    >
                      <FontAwesomeIcon className="fab fa-2x" icon={faGlobe} />
                    </a>
                  )}

                  {isEmpty(profile.social && profile.social.twitter) ? (
                    undefined
                  ) : (
                    <a
                      className="text-white p-2"
                      href={profile.social!.twitter}
                      target="_blank"
                    >
                      <FontAwesomeIcon className="fab fa-2x" icon={faTwitter} />
                    </a>
                  )}

                  {isEmpty(profile.social && profile.social.facebook) ? (
                    undefined
                  ) : (
                    <a
                      className="text-white p-2"
                      href={profile.social!.facebook}
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        className="fab fa-2x"
                        icon={faFacebook}
                      />
                    </a>
                  )}

                  {isEmpty(profile.social && profile.social.linkedin) ? (
                    undefined
                  ) : (
                    <a
                      className="text-white p-2"
                      href={profile.social!.linkedin}
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        className="fab fa-2x"
                        icon={faLinkedin}
                      />
                    </a>
                  )}

                  {isEmpty(profile.social && profile.social.youtube) ? (
                    undefined
                  ) : (
                    <a
                      className="text-white p-2"
                      href={profile.social!.youtube}
                      target="_blank"
                    >
                      <FontAwesomeIcon className="fab fa-2x" icon={faYoutube} />
                    </a>
                  )}

                  {isEmpty(profile.social && profile.social.instagram) ? (
                    undefined
                  ) : (
                    <a
                      className="text-white p-2"
                      href={profile.social!.instagram}
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        className="fab fa-2x"
                        icon={faInstagram}
                      />
                    </a>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return undefined;
  }
}
export default ProfileHeader;
