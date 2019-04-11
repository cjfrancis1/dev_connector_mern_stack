import React, { Component, FormEvent, ChangeEvent } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import IClientErrors from "../../interfaces/ClientErrors.interface";
import IClientProfileState from "../../interfaces/ClientProfileState.interface";
import { addEducation } from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

interface IAddEducationStateProps {
  profile: IClientProfileState;
  errors: IClientErrors;
  addEducation: Function;
}

interface IAddEducationProps
  extends IAddEducationStateProps,
    RouteComponentProps {}

interface IAddEducationState {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: string;
  to: string;
  current: boolean;
  description: string;
  errors: IClientErrors;
  disabled: boolean;
}

class AddEducation extends Component<IAddEducationProps, IAddEducationState> {
  constructor(props: IAddEducationProps) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps: IAddEducationProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
  }

  onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  onCheck(e: ChangeEvent<HTMLInputElement>) {
    this.setState(
      {
        disabled: !this.state.disabled,
        current: !this.state.current
      },
      () => {
        if (this.state.disabled === true && this.state.current === true) {
          this.setState({ to: "" });
        }
      }
    );
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc. that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="Field of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Program
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the program that you were in"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: {
  profile: IClientProfileState;
  errors: IClientErrors;
}) => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
