import { Component } from "react";
import { userService } from "../services/user-service";
import {NavMenu} from '../cmps/app/NavMenu'
export class UserDetails extends Component {

  state = {
    user:"",
    isEditMode:false
  }

  componentDidMount() {
    this.loadUser()
    console.log(this.state);
  }

  loadUser = async () => {
    let sessionUser = sessionStorage.getItem('loggedinUser')
    sessionUser = JSON.parse(sessionUser)
    const user = await userService.getById(sessionUser._id)
    this.setState({ user })
    console.log(user.fullname);
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
    console.log(this.state);
}
  render() {
    console.log(this.state);

    const currUser = this.state.user
    
    if (!currUser) return <h1>loading...</h1>
    const {fullname,username,email,id,imgUrl}=currUser
    const firstName=fullname.split(' ')
    const isEditMode=this.state.isEditMode
    console.log(isEditMode);
    // const { capacity, summary, price, stayType, name, host } = stay;

    return (
        
      <main className="user-details page">
        <img src={imgUrl} alt=""/>
        <h1>hey {firstName[0]}</h1>
        <h1>Your Details</h1>
          {!isEditMode && <div>
        <p>full name: {fullname}</p>
        <p>username: {username}</p>
        <p>email: {email}</p>
        <button onClick={this.toggleEditMode}>Edit</button>
              </div>}
        {isEditMode && <div>
            <h3>full name: <input type="text" name="fullname" autoComplete="off" onChange={this.handleChange} value={fullname} /></h3>
            <h3>username: <input type="text" name="username" autoComplete="off" onChange={this.handleChange} value={username} /></h3>
            <h3>email: <input type="text" name="email" autoComplete="off" onChange={this.handleChange} value={email} /></h3>
        <button onClick={this.onUpdateUser}>save</button>
            </div>}
            <NavMenu/>
      </main>
    );
  }
}
