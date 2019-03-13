const validator = require('validator')
const isEmpty = require('./is_empty')
module.exports = function validatePostInput(data) {
  let errors = {}
  if (!validator.isLength(data.text, { min: 10, max: 200 })) {
    errors.text = 'Post must be between 10 and 200 characters'
  }
  data.text = !isEmpty(data.text) ? data.text : ''
  if (validator.isEmpty(data.text)) {
    errors.text = 'text field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
