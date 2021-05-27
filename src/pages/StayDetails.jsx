import { Component } from "react";
import { stayService } from "../services/stay-service";

export class StayDetails extends Component {

  state = {
    stay: null
  }

  componentDidMount() {
    this.loadStay()
  }

  loadStay = async () => {
    const { stayId } = this.props.match.params
    const stay = await stayService.getById(stayId)
    this.setState({ stay })
  }


  render() {
    const { stay } = this.state

    if (!stay) return <h1>loading...</h1>
    const { capacity, summary, price, stayType, name, host } = stay;

    return (
      <main className="stay-details-container">
        <h1>Stay Details</h1>
        <h4>stay title {name}</h4>
        <div className="stay-short-info">
          <div>
            <p>4.5 start</p>
            <span>•</span>
            <p>tel aviv arlozorov</p>
          </div>
          <div>
            <button>share</button>
            <button>save</button>
          </div>
        </div>
        <div className="stay-gallery">
          {stay.imgUrls.map(imgUrl => <img src={imgUrl} alt="stay-gallery-preview-img" />)}
        </div>

        <div className="stay-info-continer">
          <div className="stay-long-info">
            <div className="stay-long-info-header">
              <span>{`${stayType} hosted by ${host.fullname}`}</span>
              <img src={host.imgUrl} alt="" />
            </div>
            <span>capacity: {capacity} guests</span>
            <span>{summary}</span>
          </div>
          <div className="order-form">
            <span>Price ${price}</span>
          </div>
        </div>
      </main>
    );
  }
}
