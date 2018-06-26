import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.clearCurrentProfile();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            href=""
            className="nav-link"
            onClick={this.onLogoutClick.bind(this)}
          >
            welcome {user.name} || logout
          </a>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/addPost">
            Add Post
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    );

    return (
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link className="nav-link active" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/blog">
            Blog
          </Link>
        </li>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
