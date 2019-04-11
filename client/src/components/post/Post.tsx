import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Spinner from "../common/Spinner";
import { getPost } from "../../actions/postActions";
import IClientPostState from "../../interfaces/ClientPostState.interface";
import IClientPost from "../../interfaces/ClientPost.interface";

interface IPostProps extends RouteComponentProps {
  getPost: Function;
  post: IClientPostState;
}

class Post extends Component<IPostProps> {
  componentDidMount() {
    this.props.getPost((this.props.match.params as { id: string }).id);
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (post === undefined || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post as IClientPost} showActions={false} />
          <CommentForm postId={(post as IClientPost)._id} />
          <CommentFeed
            postId={(post as IClientPost)._id}
            comments={(post as IClientPost).comments}
          />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: { post: IClientPostState }) => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
