import { Component } from "react";
import { Link } from "react-router-dom";
import { utilService } from '../services/util-service'

export class Notifications extends Component {

  async componentDidMount() {
    this.props.setFooterDisplay(false)
    this.props.setHomePage('user')
  }

  async componentWillUnmount() {
    this.props.setFooterDisplay(true)
  }


  render() {
    const { notifications } = this.props.loggedInUser

    return (
      <main className="notifications main page">
        <h1>Notifications</h1>
        <section className="notif-list">
          {notifications && notifications.map(notif => {
            return (
              <div key={Math.random()} className="notif-card">
                <img src={notif.from.imgUrl} alt="avatar" />
                <span>
                  <h3>{notif.from.fullname}</h3>
                  <h4>{utilService.getTimeFormat(notif.body.createdAt)}</h4>
                </span>
                <h4>{notif.body.txt}</h4>
                <Link to={`/host/${this.props.loggedInUser._id}`}>Dashboard</Link>
              </div>
            )
          })}
        </section>
      </main>
    );
  }
}
