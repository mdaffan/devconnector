import Navbar from './Components/layout/Navbar'
import Landing from './Components/layout/Landing'
import Footer from './Components/layout/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Register from './Components/authentication/Register'
import Login from './Components/authentication/Login'
import { createStore, applyMiddleware } from 'redux'
const store = createStore(() => [], {}, applyMiddleware())
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
