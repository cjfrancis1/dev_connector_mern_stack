import axios from "../config/axios.config";
import Types from "./types";
import IClientPost, {
  IClientCommentItem
} from "../interfaces/ClientPost.interface";
import MyThunkDispatch from "../customTypes/MyThunkDispatch";

// Add Post
export const addPost = (postData: IClientPost) => (
  dispatch: MyThunkDispatch
) => {
  dispatch(clearErrors());
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: Types.ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const getPosts = () => (dispatch: MyThunkDispatch) => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: Types.GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: Types.GET_POSTS,
        payload: undefined
      })
    );
};

// Get Post
export const getPost = (id: string) => (dispatch: MyThunkDispatch) => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: Types.GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: Types.GET_POST,
        payload: undefined
      })
    );
};

// Delete Post
export const deletePost = (id: string) => (dispatch: MyThunkDispatch) => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: Types.DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Like
export const addLike = (id: string) => (dispatch: MyThunkDispatch) => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like
export const removeLike = (id: string) => (dispatch: MyThunkDispatch) => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Comment
export const addComment = (postId: string, commentData: IClientCommentItem) => (
  dispatch: MyThunkDispatch
) => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: Types.GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Comment
export const deleteComment = (
  postId: number,
  commentId: IClientCommentItem
) => (dispatch: MyThunkDispatch) => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: Types.GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: Types.POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: Types.CLEAR_ERRORS
  };
};
