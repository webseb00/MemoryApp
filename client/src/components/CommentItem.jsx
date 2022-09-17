import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CommentItem = ({ text, user, createdAt }) => {

  const { firstName, lastName } = user;
  const createdDate = new Date(createdAt).toLocaleDateString()

  return (
    <li className="mb-3 rounded-lg shadow-sm border">
      <div className="p-3">{text}</div>
      <footer className="bg-gray-100 p-2 flex justify-between">
        <div>
          Posted By: 
          <Link
            to="/"
            className="text-blue-700 ml-2 font-semibold"
          >
            {firstName} {lastName}
          </Link>
        </div>
        <div>
          <p>{createdDate}</p>
        </div>
      </footer>
    </li>
  )
}

CommentItem.propTypes = {
  text: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired
}

export default CommentItem