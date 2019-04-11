import { Document } from "mongoose";

interface IPost extends Document {
  id: string;
  user: string;
  text: string;
  name?: string;
  avatar?: string;
  likes: [
    {
      user: string;
    }
  ];
  comments: Array<ICommentItem>;
  date?: Date;
}

export interface ICommentItem {
  id?: string;
  user: string;
  text: string;
  name?: string;
  avatar?: string;
  date?: Date;
}

export default IPost;
