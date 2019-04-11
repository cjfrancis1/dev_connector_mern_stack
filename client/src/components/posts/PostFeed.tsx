import React, { Component } from "react";
import PostItem from "./PostItem";
import IClientPost from "../../interfaces/ClientPost.interface";

class PostFeed extends Component<{ posts: IClientPost[] }> {
  render() {
    const { posts } = this.props;

    return posts.map(post => <PostItem key={post._id} post={post} />);
  }
}

export default PostFeed;
