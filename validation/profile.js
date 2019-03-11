const validator = require('validator')
const isEmpty = require('./is_empty')
module.exports = function validateProfileInput(data) {
  let errors = {}

  data.handle = !isEmpty(data.handle) ? data.handle : ''
  data.status = !isEmpty(data.status) ? data.status : ''
  data.skills = !isEmpty(data.skills) ? data.skills : ''
  if (validator.isEmpty(data.handle)) {
    errors.handle = 'Handle field is required'
  }
  if (!(validator.isLength(data.handle), { min: 2, max: 40 })) {
    errors.handle = 'Handle Needs to be Between 2 and 40 Characters'
  }
  if (validator.isEmpty(data.status)) {
    errors.status = 'status field is required'
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = 'skills field is required'
  }
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = 'Not a Valid link'
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = 'Not a Valid link'
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = 'Not a Valid link'
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a Valid link'
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = 'Not a Valid link'
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = 'Not a Valid link'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
