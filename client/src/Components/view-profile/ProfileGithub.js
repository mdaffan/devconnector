import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class ProfileGithub extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clientId: '99d170af06b01f450968',
      clientSecret: 'bac1b47818f28334f38c60efd138409334cf7e3a',
      count: 6,
      sort: 'created:asc',
      repos: []
    }
  }
  async componentDidMount() {
    const { username } = this.props
    const { count, sort, clientId, clientSecret } = this.state
    try {
      const data = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}$client_id=${clientId}&client_secret=${clientSecret}`
      )
      if (!data.ok) {
        throw Error(data.statusText)
      }
      const jsonData = await data.json()
      console.log(jsonData)
      if (this.refs.myRef) {
        this.setState({ repos: jsonData })
      }
    } catch (error) {
      console.log(errors)
    }
  }
  render() {
    const { repos } = this.state
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link
                to={`/${repo.html_url}`}
                className="text-info"
                target="_blank"
              >
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars:{repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers:{repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks:{repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ))
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    )
  }
}
ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
}
export default ProfileGithub
