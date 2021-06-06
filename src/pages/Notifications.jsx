import { Component } from "react";
import { socketService } from "../services/socketService";



export class Notifications extends Component {

  state = {
    notifications: [
      {
        from: {
          imgUrl: '',
          username: '',
          fullname: ''
        },
        body: {
          txt: '',
          createdAt: ''
        }
      }
    ]
  }


  componentDidMount() {
    this.loadUser()
    this.props.setFooterDisplay(false)
    this.props.setHomePage('user')
    socketService.on('notify host', this.setNewMsg)
  }

  setNewMsg = (msg) => {
    this.setState({})
  }

  componentWillUnmount() {
    this.props.setFooterDisplay(true)
  }

  loadUser = async () => {
    this.setState({ user: this.props.loggedInUser })
  }

  render() {
    const { user } = this.state

    return (
      <main className="notifications main page">
        <h1>Notifications</h1>
        <section>
          {user && user.notifications && user.notifications.map(notif => {
            return (
              <div className="notif-card">
                <img src={notif.from.imgUrl} alt="avatar" />
                <h3>{notif.from.username}</h3>
                <h4>{notif.body.txt}</h4>
                <h4>{notif.body.createdAt}</h4>
              </div>
            )
          })}
        </section>



      </main>
    );
  }
}
