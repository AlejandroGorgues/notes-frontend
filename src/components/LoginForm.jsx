import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    loginUser({
      username, password,
    })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  loginUser: PropTypes.func.isRequired
}
export default LoginForm