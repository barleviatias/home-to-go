import { Component } from "react";
import { userService } from "../services/user-service";


export class UserDetails extends Component {

  state = {
    user: "",
    isEditMode: false
  }

  componentDidMount() {
    this.loadUser()
    this.props.setFooterDisplay(false)
    this.props.setHomePage('user')
  }

  componentWillUnmount() {
    this.props.setFooterDisplay(true)
  }

  loadUser = async () => {
    let sessionUser = sessionStorage.getItem('loggedinUser')
    sessionUser = JSON.parse(sessionUser)
    const user = await userService.getById(sessionUser._id)
    this.setState({ user })
  }

  handleChange = ({ target }) => {
    const { name } = target
    const { value } = target
    this.setState({ user: { ...this.state.user, [name]: value } })
  }

  onUpdateUser = () => {
    this.props.updateUser(this.state.user)
    this.toggleEditMode()
  }

  toggleEditMode = () => {
    this.setState({ isEditMode: !this.state.isEditMode })
  }

  render() {
    const currUser = this.state.user

    if (!currUser) return <h1>loading...</h1>
    const { fullname, username, email, imgUrl } = currUser
    const firstName = fullname.split(' ')
    const isEditMode = this.state.isEditMode

    return (

      <main className="user-details main page">

        {/* <div className="user-details-header">
          <img src={imgUrl} alt="avatar" />
          <span>
            <h1>Hello {firstName[0]}</h1>
            <p>It's great to have you with us.</p>
          </span>
        </div> */}

        <h1>Personal info</h1>

        {!isEditMode &&
          <div className="user-details-info">
            <p>full name: {fullname}</p>
            <p>username: {username}</p>
            <p>email: {email}</p>
            {/* <p>password: ******</p> */}
            <button onClick={this.toggleEditMode}>Edit</button>
          </div>}

        {isEditMode &&
          <div className="user-details-info user-edit" >
            <h3>full name: <input type="text" name="fullname" autoComplete="off" onChange={this.handleChange} value={fullname} /></h3>
            <h3>username: <input type="text" name="username" autoComplete="off" onChange={this.handleChange} value={username} /></h3>
            <h3>email: <input type="text" name="email" autoComplete="off" onChange={this.handleChange} value={email} /></h3>
            {/* <h3>password: <input type="password" name="password" autoComplete="off" onChange={this.handleChange} value={password} /></h3> */}
            <button onClick={this.onUpdateUser}>save</button>
          </div>}

      </main>
    );
  }
}
