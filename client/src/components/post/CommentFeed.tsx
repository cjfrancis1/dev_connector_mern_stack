import React, { Component } from "react";
import CommentItem from "./CommentItem";
import { IClientCommentItem } from "../../interfaces/ClientPost.interface";

class CommentFeed extends Component<{
  comments: IClientCommentItem[];
  postId: string;
}> {
  render() {
    const { comments, postId } = this.props;

    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} postId={postId} />
    ));
  }
}

export default CommentFeed;
