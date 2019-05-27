import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { registeruser } from '../../actions/authActions'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFeildGroup'
class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
  }
  handleClick = e => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.email]: e.target.value,
      [e.target.password]: e.target.value,
      [e.target.password2]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    this.props.registeruser(newUser, this.props.history)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }
  render() {
    const { errors } = this.state

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevWorld account</p>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleClick}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleClick}
                  error={errors.email}
                  info=" This site uses Gravatar so if you want a profile image, use
                    a Gravatar email"
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleClick}
                  type="password"
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.handleClick}
                  type="password"
                  error={errors.password2}
                />

                <input type="submit" className="btn btn-info btn-block mt-3" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Register.propTypes = {
  registeruser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
})
export default connect(
  mapStatetoProps,
  { registeruser }
)(withRouter(Register))
