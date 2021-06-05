

export function DashHeader(props) {


    return (
        <section className="dash-header">
            <div>
                <h3>Total Rate</h3>
                <div>
                    <span><i className="fas fa-star"></i>4.52</span>
                    <p>4%<i className="fas fa-long-arrow-alt-down"></i></p>
                </div>
            </div>
            <div>
                <h3>monthly earning</h3>
                <div>
                    <span>$ 1,450</span>
                    {/* <div className="circle-container">
                        <div>
                            <span title="Occupied" className="circle circle-yellow"></span>
                            <p>2</p>
                        </div>
                        <div>
                            <span title="Free" className="circle circle-green"></span>
                            <p>1</p>
                        </div>
                    </div> */}
                </div>
            </div>
            <div>
                <h3>Orders</h3>
                <div>
                    <span>12</span>
                    <div className="circle-container">
                        <div>
                            <span title="pending" className="circle circle-yellow"></span>
                            <p>7</p>
                        </div>
                        <div>
                            <span title="approved" className="circle circle-green"></span>
                            <p>5</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h3>Active Guests</h3>
                    <span>5</span>
                </div>
                <div>
                    <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="guest" />
                    <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="guest" />
                    <img src="https://randomuser.me/api/portraits/women/4.jpg" alt="guest" />
                    <img src="https://randomuser.me/api/portraits/men/5.jpg" alt="guest" />
                    <img src="https://randomuser.me/api/portraits/women/6.jpg" alt="guest" />
                </div>
            </div>
        </section>
    )
}