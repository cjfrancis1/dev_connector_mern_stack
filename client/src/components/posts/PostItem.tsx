import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";
import IClientPost from "../../interfaces/ClientPost.interface";
import IClientAuthState from "../../interfaces/ClientAuthState.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

interface IPostItemProps {
  showActions?: boolean;
  deletePost: Function;
  addLike: Function;
  removeLike: Function;
  post: IClientPost;
  auth: IClientAuthState;
}

class PostItem extends Component<IPostItemProps> {
  onDeleteClick(id: string) {
    this.props.deletePost(id);
  }

  onLikeClick(id: string) {
    this.props.addLike(id);
  }

  onUnlikeClick(id: string) {
    this.props.removeLike(id);
  }

  findUserLike(
    likes: [
      {
        user: string;
      }
    ]
  ) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions = true } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className={classnames("fas", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <FontAwesomeIcon
                    icon={faThumbsDown}
                    className="text-secondary fas"
                  />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                ) : (
                  undefined
                )}
              </span>
            ) : (
              undefined
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: { auth: IClientAuthState }) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
