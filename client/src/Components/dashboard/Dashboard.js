import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Spinner from '../common/Spinner'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profileActions'
class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }
  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile
    let dashboardContent

    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      ///Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>display Profile</h4>
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You Haven't setup a profile yet</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              CreateProfile
            </Link>
          </div>
        )
      }
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
    )
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard)
