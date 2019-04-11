import React, { Component, ChangeEvent, FormEvent } from "react";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";
import IClientErrors from "../../interfaces/ClientErrors.interface";
import IClientAuthState from "../../interfaces/ClientAuthState.interface";

interface IPostFormProps {
  addPost: Function;
  auth: IClientAuthState;
  errors: IClientErrors;
}

interface IPostFormStateProps {
  auth: IClientAuthState;
  errors: IClientErrors;
}

interface IPostFormState {
  text: string;
  errors: IClientErrors;
}

class PostForm extends Component<IPostFormProps, IPostFormState> {
  constructor(props: IPostFormProps) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps: IPostFormProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ text: "" });
  }

  onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IPostFormStateProps) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
