interface IClientPost {
  _id: string;
  user: string;
  text: string;
  name?: string;
  avatar?: string;
  likes: [
    {
      user: string;
    }
  ];
  comments: Array<IClientCommentItem>;
  date?: Date;
}

export interface IClientCommentItem {
  _id: string;
  user: string;
  text: string;
  name?: string;
  avatar?: string;
  date?: Date;
}

export default IClientPost;
