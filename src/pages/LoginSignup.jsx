// import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  loadUsers,
  removeUser,
  login,
  logout,
  signup
} from '../store/actions/userActions'

class _LoginSignup extends Component {

  state = {
    msg: '',
    loginCred: {
      username: '',
      password: ''
    },
    signupCred: {
      username: '',
      password: '',
      fullname: ''
    },
    formType: 'login'
  }

  componentDidMount() {
    this.props.loadUsers()
  }

  loginHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }))
  }

  signupHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value
      }
    }))
  }

  doLogin = async ev => {
    ev.preventDefault()
    const { username, password } = this.state.loginCred
    if (!username) {
      return this.setState({ msg: 'Please enter user/password' })
    }
    const userCreds = { username, password }
    try {
      this.props.login(userCreds)
      this.setState({ loginCred: { username: '', password: '' } }, this.props.history.push('/toy'))
    } catch (err) {
      this.setState({ msg: 'Login failed, try again.' })
    }
  }

  doSignup = async ev => {
    ev.preventDefault()
    const { username, password, fullname } = this.state.signupCred
    if (!username || !password || !fullname) {
      return this.setState({ msg: 'All inputs are required' })
    }
    const signupCreds = { username, password, fullname }
    this.props.signup(signupCreds)
    this.setState({ signupCred: { username: '', password: '', fullname: '' } }, this.props.history.push('/toy'))
  }

  removeUser = userId => {
    this.props.removeUser(userId)
  }

  toggleFormType=()=>{
    const currForm = this.state.formType
    const nextForm = (currForm === 'login') ? 'signup' : 'login'
    this.setState({formType: nextForm})
  }

  render() {
    let signupSection = (
      <form className="login-form" onSubmit={this.doSignup}>
        <h2>Sign Up</h2>
        <input
          type="text"
          name="fullname"
          value={this.state.signupCred.fullname}
          onChange={this.signupHandleChange}
          placeholder="Full name"
          autoComplete="fullname"
        />
        <input
          name="password"
          type="password"
          value={this.state.signupCred.password}
          onChange={this.signupHandleChange}
          placeholder="Password"
          autoComplete="current-password"
        />
        <input
          type="text"
          name="username"
          value={this.state.signupCred.username}
          onChange={this.signupHandleChange}
          placeholder="Username"
          autoComplete="username"
        />
        <button className="signup-btn" type="submit" >sign up</button>
        <button type="button" className="toggle-form-btn" onClick={this.toggleFormType}> I already have an account</button>
      </form>
    )
    let loginSection = (
      <form className="login-form" onSubmit={this.doLogin}>
        <h2>Login</h2>

        {/* <select
          name="username"
          value={this.state.loginCred.username}
          onChange={this.loginHandleChange}
        >
          <option value="">Select User</option>
          {this.props.users && this.props.users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
        </select> */}

        <input
          type="text"
          name="username"
          autoComplete="off"
          value={this.state.loginCred.username}
          onChange={this.loginHandleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          autoComplete="off"
          value={this.state.loginCred.password}
          onChange={this.loginHandleChange}
          placeholder="Password"
        />
        <button type="submit" className="login-btn">submit</button>
        <button type="button" className="toggle-form-btn" onClick={this.toggleFormType}>New user?</button>
        <button type="button" className="forgot-password-btn" onClick={()=>{alert('Tough Luck')}}>Forgot Password?</button>
      </form>
    )

    const { loggedInUser } = this.props
    const {formType} = this.state

    return (
      <main className="login-container">
        {/* <h2> Login / Signup </h2> */}
        <p>{this.state.msg}</p>

        <section className="login-forms-container">
          {!loggedInUser && formType === 'login' && loginSection}
          {!loggedInUser && formType === 'signup' && signupSection}
        </section>

        {loggedInUser && loggedInUser.isAdmin && <section className="admin">
          <details>
            <summary>Admin</summary>
            <button onClick={this.props.loadUsers}>Refresh Users</button>
            {this.props.isLoading && 'Loading...'}
            {this.props.users && <ul>

              {this.props.users.map(user => (
                <li key={user._id}>
                  <pre>{JSON.stringify(user, null, 2)}</pre>
                  <button
                    onClick={() => {
                      this.removeUser(user._id)
                    }}
                  >
                    Remove {user.username}
                  </button>
                </li>
              ))}
            </ul>}
          </details>
        </section>}
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser,
    isLoading: state.systemModule.isLoading
  }
}
const mapDispatchToProps = {
  login,
  logout,
  signup,
  removeUser,
  loadUsers
}

export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)
