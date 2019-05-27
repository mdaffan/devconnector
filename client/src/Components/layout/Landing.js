import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
class Landing extends React.Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer's World</h1>
                <p className="lead">
                  Create an awesome developer profile,Add posts about tech world
                  and share your views on other's posts,Get help from other
                  developers by sharing the problems you are facing and help
                  others ultimately contributing to open source
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Landing.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(Landing)
