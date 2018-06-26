import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import PostFeed from "../posts/PostFeed";

class Dashboard extends Component {
  componentDidMount() {
    // this.props.getCurrentProfile();
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;

    let dashboardContent;

    if (posts === null || loading) {
      dashboardContent = <h4> Loading... </h4>;
    } else {
      dashboardContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>

              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Dashboard);
