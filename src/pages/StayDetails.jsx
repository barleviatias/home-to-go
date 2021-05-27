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

  getRate = () => {
    const rates = this.state.stay.reviews.map(review => review.avgRate)
    const sum = rates.reduce((acc, rate) => {
      acc += rate
      return acc
    }, 0)
    return sum / rates.length
  }


  render() {
    const { stay } = this.state

    if (!stay) return <h1>loading...</h1>
    const { loc, capacity, summary, price,stayType, propertyType, reviews, name, host } = stay

    return (
      <main className="stay-details-container">

        <section className="stay-details-header">
          <h1>{name}</h1>
          <div className="stay-short-info">
            <div>
              <span className="stay-rate-display"><i className="fas fa-star"></i>{this.getRate()}<p>( {reviews.length} reviews )</p></span>
              <span>•</span>
              <p>{loc.address}</p>
            </div>
            <div>
              <button><p><i className="fas fa-external-link-alt"></i>share</p></button>
              <button className="stay-save-btn"><p><i className="far fa-heart"></i>save</p></button>
            </div>
          </div>
        </section>

        <div className="stay-gallery">
          {stay.imgUrls.map(imgUrl => <img src={imgUrl} alt="stay-gallery-preview-img" />)}
        </div>

        <section className="stay-info-container">

          <div className="stay-long-info">

            <div className="stay-long-info-header">
              <div>
                <h2>{`${propertyType} hosted by ${host.fullname}`}</h2>
                <span>{capacity} guests • {stayType} • {propertyType}</span>
              </div>
              <img src={host.imgUrl} alt="" />
            </div>

            
            <span>{summary}</span>

          </div>

          <div className="stay-details-botton-right">
            <div className="order-form">
              <div className="order-form-header">
                <p><span className="order-price">${price}</span><span> / night</span></p>
                <span className="stay-rate-display"><i className="fas fa-star"></i>{this.getRate()}<p>( {reviews.length} reviews )</p></span>
              </div>

              <form>
                <div className="order-form-date-picker">
                  <label className="check-in-lable" htmlFor="check-in">
                    <span>Check in</span>
                    <input name="check-in" id="check-in" type="text" placeholder="Add dates" />
                  </label>
                  <label className="check-out-lable" htmlFor="check-out">
                    <span>Check out</span>
                    <input name="check-out" id="check-out" type="text" placeholder="Add dates" />
                  </label>
                </div>

                <label className="guests-lable" htmlFor="guests">
                  <span>Guests</span>
                  <input name="guests" id="guests" type="text" placeholder="Add guests" />
                </label>
                <button className="book-stay-btn">Check availability</button>
              </form>
            </div>
            <span className="report-listing-btn"><i className="fab fa-font-awesome-flag"></i><p>Report this listing</p></span>
          </div>

        </section>
      </main>
    );
  }
}
