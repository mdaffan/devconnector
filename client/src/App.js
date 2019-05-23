import Navbar from './Components/layout/Navbar'
import Landing from './Components/layout/Landing'
import Footer from './Components/layout/Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions'
import Register from './Components/authentication/Register'
import Login from './Components/authentication/Login'
import Dashboard from './Components/dashboard/Dashboard'
import CreateProfile from '../src/Components/create_profile/CreateProfile'
import PrivateRoute from '../src/Components/common/PrivateRoute'
import store from './store'
//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken)
  //Decode token and get info
  const decoded = jwt_decode(localStorage.jwtToken)
  //Set User and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  //Check For Expired Token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())
    // Clear current Profile
    store.dispatch(clearCurrentProfile())
    // Redirect to login
    window.location.href = '/login'
  }
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}
export default App
