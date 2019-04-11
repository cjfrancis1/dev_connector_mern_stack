import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlackTie } from "@fortawesome/free-brands-svg-icons";
import {
  faGraduationCap,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <FontAwesomeIcon icon={faUserCircle} className="fas text-info mr-1" />
        Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <FontAwesomeIcon icon={faBlackTie} className="fab text-info mr-1" />
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <FontAwesomeIcon
          icon={faGraduationCap}
          className="fas text-info mr-1"
        />
        Add Education
      </Link>
    </div>
  );
};

export default ProfileActions;
