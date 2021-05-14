import axios from "axios";
import { setAlert } from "./alert";
import {
  Get_Posts,
  Post_Error,
  Update_like,
  Delete_Post,
  ADD_Post,
  Get_Post,
  Remove_Comment,
  Add_Comment
} from "./types";

//get_posts

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: Get_Posts,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: Post_Error,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};



//get_post

export const getPost = (id) => async (dispatch) => {
  try {
  
    const res = await axios.get(`/api/posts/${id}`);
    
    dispatch({
      type: Get_Post,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: Post_Error,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//Add Like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    dispatch({
      type: Update_like,
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: Post_Error,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Remove Like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch({
      type: Update_like,
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: Post_Error,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete Post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    dispatch({
      type: Delete_Post,
      payload: postId,
    });
    dispatch(setAlert("Post has been deleted", "success"));
  } catch (error) {
    dispatch({
      type: Post_Error,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// add Post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    console.log('post12')
    const res = await axios.post(`/api/posts/`, formData, config);
  
    dispatch({
      type: ADD_Post,
      payload: res.data,
    });
    dispatch(setAlert("Post Creadted", "success"));
  } catch (error) {
    dispatch({
      type: Post_Error,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//add comment
export const addComment = (postId ,formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);
    dispatch({
      type: Add_Comment,
      payload: res.data,
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (error) {
    dispatch({
      type: Post_Error,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};


//Delete comment
export const removeComment = (postId ,commentId) => async (dispatch) => {
 
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: Remove_Comment,
      payload: commentId,
    });
    dispatch(setAlert("Comment Removed", "success"));
  } catch (error) {
    dispatch({
      type: Post_Error,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};


