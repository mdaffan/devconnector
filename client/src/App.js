import Navbar from './Components/layout/Navbar'
import Landing from './Components/layout/Landing'
import Footer from './Components/layout/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './actions/authActions'
import Register from './Components/authentication/Register'
import Login from './Components/authentication/Login'
import store from './store'
//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken)
  //Decode token and get info
  const decoded = jwt_decode(localStorage.jwtToken)
  //Set User and isAuthenticated
  store.dispatch(setCurrentUser(decoded))
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
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}
export default App
