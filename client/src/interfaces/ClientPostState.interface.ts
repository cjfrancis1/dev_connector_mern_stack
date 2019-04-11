import IClientPost from "./ClientPost.interface";

export default interface IClientPostState {
  posts: Array<IClientPost>;
  post: IClientPost | {};
  loading: boolean;
}
