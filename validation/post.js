const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.seotitle = !isEmpty(data.seotitle) ? data.seotitle : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.seotitle)) {
    errors.seotitle = "seo title field required";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "title field required";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "text field required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
