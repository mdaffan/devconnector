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
import EditProfile from './Components/edit-profile/EditProfile'
import AddExperience from './Components/add-info/AddExperience'
import AddEducation from './Components/add-info/AddEducation'
import Profiles from './Components/profiles/Profiles'
import Profile from './Components/view-profile/Profile'
import NotFound from './Components/NotFound/NotFound'
import Posts from './Components/posts/Posts'
import Post from './Components/post/Post'
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
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/not-found" component={NotFound} />
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
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
