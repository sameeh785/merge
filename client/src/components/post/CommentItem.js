import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { removeComment } from "../../actions/post";

const CommentItem = ({
  postId,
  auth,
  removeComment,
  comment: { _id, name, text, avatar, user, date },
}) => {
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img class="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{text}</p>
        <p class="post-date">
          Posted on <Moment format="YYYY-MM-DD">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id ? (
          <button
            onClick={() => {
              removeComment(postId, _id);
            }}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        ) : null}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.func.isRequired,
  removeComment: PropTypes.func.isRequired,
};

export default connect(
  (state) => {
    return {
      auth: state.auth,
    };
  },
  { removeComment }
)(CommentItem);
