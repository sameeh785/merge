import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPost } from "../../actions/post";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from './CommentItem'
const Post = ({ getPost, match, post: { loading, post } }) => {
  useEffect(() => {
    console.log("ak bar sahi");
    getPost(match.params.id);
  }, [getPost]);
  return (
    <div>
      {loading && post === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/posts" className="btn">
            Back To Post
          </Link>
          {post?._id ? (
            <Fragment>
              <PostItem post={post} showAction={false} />{" "}
              <CommentForm postId={post._id} />{" "}
              <div className="comments">
                {
                  post.comments.map((comment) =>{
                  return  <CommentItem key={comment._id} comment={comment} postId={post._id} />
                  })
                }
              </div>
            </Fragment>
          ) : (
            <Spinner />
          )}
        </Fragment>
      )}
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};

export default connect(
  (state) => {
    return {
      post: state.post,
    };
  },
  { getPost }
)(Post);
