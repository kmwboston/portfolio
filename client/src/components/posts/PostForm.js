import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";
import { withRouter } from "react-router-dom";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seotitle: "",
      title: "",
      text: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      seotitle: this.state.seotitle,
      title: this.state.title,
      text: this.state.text,
      name: user.name
    };

    this.props.addPost(newPost);
    this.setState({ text: "", title: "", seotitle: "" });
    this.props.history.push("/dashboard");
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Whats on your mind?
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="SEO Title"
                name="seotitle"
                value={this.state.seotitle}
                onChange={this.onChange}
                errors={errors.seotitle}
                info="A seo title to link to your post"
              />
              <TextFieldGroup
                placeholder="Title"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
                errors={errors.title}
                info="A title for your post"
              />
              <TextAreaFieldGroup
                placeholder="create a post"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                errors={errors.text}
              />
              <button type="submit" className="btn btn-dark">
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPost }
)(withRouter(PostForm));
