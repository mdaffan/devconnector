class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: ''
    }
  }
  handleClick = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    const User = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(User)
  }
  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={this.handleClick}
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    onChange={this.handleClick}
                    value={this.state.password}
                    placeholder="Password"
                    name="password"
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
