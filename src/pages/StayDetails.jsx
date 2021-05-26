export function StayDetails({ stay }) {

  const { amenities, capacity, summary, price, stayType, imgUrls, rate, name, host } = stay;

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
        <img src="https://a0.muscache.com/im/pictures/88318135-5f04-4e68-bca3-1b81d0d6e013.jpg?im_w=720" />
        <img src="https://a0.muscache.com/im/pictures/88318135-5f04-4e68-bca3-1b81d0d6e013.jpg?im_w=720" />
        <img src="https://a0.muscache.com/im/pictures/88318135-5f04-4e68-bca3-1b81d0d6e013.jpg?im_w=720" />
        <img src="https://a0.muscache.com/im/pictures/88318135-5f04-4e68-bca3-1b81d0d6e013.jpg?im_w=720" />
        <img src="https://a0.muscache.com/im/pictures/88318135-5f04-4e68-bca3-1b81d0d6e013.jpg?im_w=720" />
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
