import React, { Component, ChangeEvent, FormEvent } from "react";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addComment } from "../../actions/postActions";
import IClientAuthState from "../../interfaces/ClientAuthState.interface";
import IClientErrors from "../../interfaces/ClientErrors.interface";

interface ICommentFormProps extends ICommentFormStateProps {
  addComment: Function;
  auth: IClientAuthState;
  postId: string;
}

interface ICommentFormStateProps {
  auth: IClientAuthState;
  errors: IClientErrors;
}

class CommentForm extends Component<
  ICommentFormProps,
  {
    text: string;
    errors: IClientErrors;
  }
> {
  constructor(props: ICommentFormProps) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps: ICommentFormProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { postId } = this.props;

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(postId, newComment);
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
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to post"
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

const mapStateToProps = (state: ICommentFormStateProps) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
