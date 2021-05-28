import { Component } from "react";
import { stayService } from "../services/stay-service";
import { ReviewList } from '../cmps/stay-details/ReviewList';

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

  getTotalRate = () => {
    const rates = this.state.stay.reviews.map(review => review.avgRate)
    const sum = rates.reduce((acc, rate) => {
      acc += rate
      return acc
    }, 0)
    return sum / rates.length
  }

  getStayReviewStatistics = () => {
    const { reviews } = this.state.stay
    const num = reviews.length

    if (!reviews) return

    const reviewCtgMap = {
      "Cleanliness": 0,
      "Accuracy": 0,
      "Communication": 0,
      "Location": 0,
      "Check-in": 0,
      "Accessibility": 0
    }

    reviews.forEach(review => {
      for (const key in review.category) {
        reviewCtgMap[key] += review.category[key]
      }
    })

    for (const ctg in reviewCtgMap) {
      reviewCtgMap[ctg] = +(reviewCtgMap[ctg] / num).toFixed(1)
    }

    const elReviews = []

    for (const ctg in reviewCtgMap) {
      elReviews.push(<div className="ctg-statistics"><h3>{ctg}</h3> <span>{reviewCtgMap[ctg]}</span></div>)
    }

    return elReviews
  }

  getAmenityIcon(amenity) {
    switch (amenity) {
      case 'TV':
        return <i className="fas fa-tv"></i>
      case 'Wifi':
        return <i className="fas fa-wifi"></i>
      case 'Air-conditioning':
        return <i className="fas fa-fan"></i>
      case 'Smoking allowed':
        return <i className="fas fa-smoking"></i>
      case 'Pets allowed':
        return <i className="fas fa-paw"></i>
      case 'Cooking basics':
        return <i className="fas fa-blender"></i>
      default:
        return <i className="fab fa-airbnb"></i>
    }
  }


  render() {
    const { stay } = this.state

    if (!stay) return <h1>loading...</h1>
    const { loc, capacity, desc, amenities, price, stayType, propertyType, reviews, name, host } = stay

    return (
      <main className="stay-details-container page">

        <section className="stay-details-header">
          <h1>{name}</h1>
          <div className="stay-short-info">
            <div>
              <span className="stay-rate-display"><i className="fas fa-star"></i>{this.getTotalRate().toFixed(1)}<p>( {reviews.length} reviews )</p></span>
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

            <div className="stay-feature-container">
              <div>
                <i className="fas fa-home"></i>
                <div>
                  <h3>{stayType}</h3>
                  <h4>{stayType === 'entire place' ? "You'll have the place to yourself." : "You'll have a private room to yourself."}</h4>
                </div>
              </div>
              <div>
                <i className="fas fa-book-open"></i>
                <div>
                  <h3>House rules</h3>
                  <h4>This place isn’t suitable for children under 12 and the host doesn’t allow pets.</h4>
                </div>
              </div>
              <div>
                <i class="fas fa-medal"></i>
                <div>
                  <h3>{host.fullname} is a Superhost</h3>
                  <h4>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</h4>
                </div>
              </div>
              <div>
                <i class="fas fa-bookmark"></i>
                <div>
                  <h3>Wifi</h3>
                  <h4>Guests often search for this popular amenity</h4>
                </div>
              </div>
            </div>

            <span className="description">{desc}</span>

            <div className="amenities-list">
              <h2>Amenities</h2>
              <ul>
                {amenities.map(amenity => { return <li key="amenity"><span>{this.getAmenityIcon(amenity)}</span><span>{amenity}</span></li> })}
              </ul>
            </div>
          </div>

          <div className="order-form-container">
            <div className="order-form">
              <div className="order-form-header">
                <p><span className="order-price">${price}</span><span> / night</span></p>
                <span className="stay-rate-display"><i className="fas fa-star"></i>{this.getTotalRate()}<p>( {reviews.length} reviews )</p></span>
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

        <section className="stay-review-container">
          <div className="stay-review-header">
            <h2>{<span className="stay-rate-display"><i className="fas fa-star"></i>{this.getTotalRate().toFixed(1)}<p>( {reviews.length} reviews )</p></span>}</h2>
            <div className="stay-review-ststistics">
              {this.getStayReviewStatistics().map(elCtgRate => elCtgRate)}
            </div>
          </div>
          <ReviewList reviews={reviews} />
        </section>
      </main>
    );
  }
}
