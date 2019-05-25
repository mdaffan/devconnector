import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Moment from 'react-moment'
import { deleteExpereince } from '../../actions/profileActions'

class Experience extends React.Component {
  onDelete(id) {
    this.props.deleteExpereince(id)
  }
  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment>-
          {exp.current ? (
            'Current'
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onDelete.bind(this, exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
    return (
      <div>
        <h4 className="mb-4">Experience Data</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    )
  }
}
Experience.propTypes = {
  deleteExpereince: PropTypes.func.isRequired
}
export default connect(
  null,
  { deleteExpereince }
)(Experience)
