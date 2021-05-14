import {
  Post_Error,
  Get_Posts,
  Update_like,
  Delete_Post,
  ADD_Post,
  Get_Post,
  Add_Comment,
  Remove_Comment
} from "../actions/types";

const intialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case Get_Posts:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case Get_Post:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_Post:
      return {
        ...state,
        posts: [payload,...state.posts],
        loading: false,
      };
    case Post_Error:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case Update_like:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case Delete_Post:
      return {
        ...state,
        posts: state.posts.filter((post) => {
          return post._id !== payload;
        }),
        loading: false,
      };
    case Add_Comment :
      return {
        ...state,
        post : { ...state.post,comments : payload},
        loading : false
      }
      case Remove_Comment :
        return {
          ...state,
          post : { ...state.post,comments : state.post.comments.filter((comment) => (comment._id !== payload))},
          loading : false 
        }
    default:
      return state;
  }
}
