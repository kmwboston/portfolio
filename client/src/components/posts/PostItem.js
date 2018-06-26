import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class PostItem extends Component {
  render() {
    const { post } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">By {post.name}</div>
          <div className="col-md-10">
            <h2>
              <Link to={`/post/${post._id}`}> {post.title}</Link>
            </h2>
            <p>{post.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostItem;
