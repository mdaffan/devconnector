import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Spinner from '../common/Spinner'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import ProfileActions from './ProfileActions'
class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }
  onDeleteClick = e => {
    this.props.deleteAccount()
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
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            {/*TODO: exp and edu*/}
            <div style={{ marginBottom: '60px' }}>
              <button onClick={this.onDeleteClick} className="btn btn-danger">
                Destroy my Account
              </button>
            </div>
          </div>
        )
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
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard)
