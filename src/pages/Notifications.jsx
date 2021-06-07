import { Component } from "react";
import { Link } from "react-router-dom";
import { utilService } from '../services/util-service'

export class Notifications extends Component {

  async componentDidMount() {
    this.props.setFooterDisplay(false)
    this.props.setHomePage('user')
    this.props.setNotifStatus(false)
  }

  async componentWillUnmount() {
    this.props.setFooterDisplay(true)
  }

  render() {
    const { notifications } = this.props.loggedInUser

    return (
      <main className="notifications main page">
        <section className="notif-list">
          <h1>Notifications</h1>
          {notifications && notifications.map(notif => {
            return (
              <div key={Math.random()} className="notif-card">
                <img src={notif.from.imgUrl} alt="avatar" />
                <span>
                  <h3>{notif.from.fullname}</h3>
                  <h4>{utilService.getTimeFormat(notif.body.createdAt)}</h4>
                </span>
                <h4 className="notif-card-txt">{notif.body.txt}</h4>
                { notif.from.fullname !== this.props.loggedInUser.fullname && <Link to={`/host/${this.props.loggedInUser._id}`}>Read More</Link>}
                { notif.from.fullname === this.props.loggedInUser.fullname && <Link to={`/orders`}>Read More</Link>}
              </div>
            )
          })}
        </section>
      </main>
    );
  }
}
